#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Jan  9 13:15:30 2020

@author: evazs
"""
#using core python
a = [1,2,3]
b = [1,2,3]
def vector_add(v, w):
    return [v_i + w_i for v_i, w_i in zip(v, w)]
vector_add(a,b)


#using core python
def vector_mul(v, w):
    return [v_i * w_i for v_i, w_i in zip(v, w)]
vector_mul(a,b)

#using numpy
import numpy as np

a_arr = np.array(a)
b_arr = np.array(b)
a_arr+b_arr