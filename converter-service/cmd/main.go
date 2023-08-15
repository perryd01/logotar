package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/perryd01/logotar/converter-service/pkg/controllers"
)

func ErrorHandler(c *gin.Context) {
	c.Next()

	if len(c.Errors) > 0 {
		c.JSON(http.StatusInternalServerError, "Something went wrong")
		return
	}

}

func main() {
	r := gin.Default()
	r.Use(ErrorHandler)

	r.GET("/healthcheck", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "ping-pong",
		})
	})

	r.GET("/convert", controllers.ConvertImage)

	r.Run()
}
