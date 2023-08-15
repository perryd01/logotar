package controllers

import (
	"encoding/json"
	"errors"
	"io"

	"github.com/gin-gonic/gin"
)

type CoverterRequestOptions struct {
	Id   int
	Size int
}

func ConvertImage(c *gin.Context) {
	requestBody, err := io.ReadAll(c.Request.Body)
	if err != nil {
		c.Error(errors.New("error reading request body"))
	}

	var options CoverterRequestOptions

	err = json.Unmarshal(requestBody, &options)
	if err != nil {
		c.Error(errors.New("error parsing request body"))
	}

	// svg.Convert(svg, options)

}
