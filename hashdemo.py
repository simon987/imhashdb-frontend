import imagehash
from PIL import Image
import numpy
from imagehash import ImageHash


def mhash(image, hash_size=8):
    if hash_size < 2:
        raise ValueError("Hash size must be greater than or equal to 2")
    image = image.convert("L").resize((hash_size, hash_size), Image.ANTIALIAS)
    pixels = numpy.asarray(image)
    m = pixels.median()
    diff = pixels > m
    return ImageHash(diff)


im = Image.open("/home/simon/Downloads/a.jpg")

im.resize((800,800), Image.NEAREST).save("out.png")

h = imagehash.whash(im, hash_size=8).hash
size = h.shape[::-1]
databytes = numpy.packbits(h, axis=1)
Image.frombytes(mode='1', size=size, data=databytes).resize((800, 800), Image.NEAREST).save("out8.png")

h = imagehash.whash(im, hash_size=16).hash
size = h.shape[::-1]
databytes = numpy.packbits(h, axis=1)
Image.frombytes(mode='1', size=size, data=databytes).resize((800, 800), Image.NEAREST).save("out16.png")

h = imagehash.whash(im, hash_size=32).hash
size = h.shape[::-1]
databytes = numpy.packbits(h, axis=1)
Image.frombytes(mode='1', size=size, data=databytes).resize((800, 800), Image.NEAREST).save("out32.png")

import os
os.system("convert +append out.png out8.png out16.png out32.png whash.png")
