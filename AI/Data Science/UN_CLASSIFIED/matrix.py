#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Jan  9 14:09:19 2020

@author: evazs
"""

mat_A = [[1, 4, 5], 
     [-5, 8, 9]]

print(mat_A)
print(len(mat_A))

A = [[1, 4, 5, 12], 
        [-5, 8, 9, 0],
        [-6, 7, 11, 19]]
print("A =", A) 
print("A[1] =", A[1])      # 2nd row
print("A[1][2] =", A[1][2])   # 3rd element of 2nd row
print("A[0][-1] =", A[0][-1])   # Last element of 1st Row

column = [];        # empty list

#for row garyo vani row ma row naii aayera basxa 
#kinaki A list ho A ma loop lauda paila row row aauxa
for row in A:
    column.append(row[2])   
    print("3rd column =", column)
    
A = [[2,2],
     [3,3]]
    
B = [[1,1],
     [2,2]]

result = [[0,0],
          [0,0]]

for i in range(len(A)): #yo vaneko 2 rows
    for j in range(len(B[0])): #yo vaneko 2 columns
        for k in range(len(B)): 
            result[i][j] += A[i][k] * B[k][j]

for r in result:
    print(r)

    