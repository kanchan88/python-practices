#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Apr 30 21:20:43 2021

@author: evazs
"""

from tensorflow.keras.models import Model
from tensorflow.keras.layers import Dense, Embedding, LSTM, Input 

enc_inp = Input(shape=(13, ))
dec_inp = Input(shape=(13, ))

#embedding converts postive integers to dense vector of fized sizes
# e.g. [[4], [20]] -> [[0.25, 0.1], [0.6, -0.2]]
VOCAB_SIZE = len(vocab)
embed = Embedding(VOCAB_SIZE+1, output_dim=50, input_lenghth=13, trainable=True)

enc_embed = embed(enc_inp)
enc_lstm = LSTM(400, return_state=True, return_sequences=True)
enc_op, h, c = enc_lstm(enc_embed)
enc_states = [h,c]

dec_embed = embed(dec_inp)
dec_lstm = LSTM(400, return_state=True, return_sequences=True)
dec_op, _,_ = dec_lstm(dec_embed, initial_state=enc_states)


dense = Dense(VOCAB_SIZE, activation="softmax")
den_op = dense(dec_op)

model = Model([enc_inp, dec_inp], den_op)

model.compile(loss="categorical_crossentropy", metric=['acc'], optimizer='adam')

model.fit([encoder_input, decoder_input], decoder_final_output, epochs=40)


































