package svg

import (
	"bytes"
	"errors"
	"image"
	"image/png"

	"github.com/fogleman/gg"
)

type ConverterOptions struct {
	LogoID int
	Width  int
	Height int
}

func Convert(svg []byte, options ConverterOptions) ([]byte, error) {
	if svg == nil {
		return nil, errors.New("svg is nil")
	}

	if options.Width <= 0 || options.Width > 4096 {
		return nil, errors.New("invalid width")
	}

	if options.Height <= 0 || options.Height > 4096 {
		return nil, errors.New("invalid height")

	}
	im, _, err := image.Decode(bytes.NewReader(svg))
	if err != nil {
		return nil, err
	}

	dc := gg.NewContext(int(options.Width), int(options.Height))
	dc.DrawImage(im, 0, 0)
	new_im := dc.Image()

	d := bytes.NewBuffer([]byte{})
	err = png.Encode(d, new_im)
	if err != nil {
		return nil, err
	}

	return d.Bytes(), nil
}
