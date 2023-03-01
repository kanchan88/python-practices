#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Apr 20 21:27:13 2021

@author: evazs
"""

lines = open("movie_lines.txt", encoding="utf-8", errors="ignore").read().split("\n")

convers = open("movie_conversations.txt", encoding="utf-8", errors="ignore").read().split("\n")
#results list of conversation in format=>u0 +++$+++ u2 +++$+++ m0 +++$+++ ['L198', 'L199']
#PREPROCESSING THE DATA
exchn = []

for conver in convers:
    #u0 +++$+++ u2 +++$+++ m0 +++$+++ ['L198', 'L199']
    #we need last values of movie_conversations that is L1234 without comma and quote
    # we initially separet by +++$+++ which will make it list
    # then remove [] from the list 
    # replace ' and space with nothing
    # and just split to split by space
    exchn.append(conver.split(' +++$+++ ')[-1][1:-1].replace("'","").replace(",","").split())
    
dialg = {}

for line in lines:
    # we map dialouge number with actual dialog
    dialg[line.split(' +++$+++ ')[0]]=line.split(' +++$+++ ')[-1]


#for training we need question and answers so

questions = []
answers = []


#we loop in our exchn which has list of qn and ans
# then we separet qns and answes
# we use dialg where is dict for dialogue
for conver in exchn:
    for i in range(len(conver)-1):
        questions.append(dialg[conver[i]])
        answers.append(dialg[conver[i+1]])
    
#to free memory and train better delete unused variables
del(line,lines, conver, convers,dialg,exchn, i)

# our model needs fixed sized length
# sorted qns and answers

sorted_ques = []
sorted_ansr = []

#yedi 15 vanda sano question vayo vane remove natra QN and ANSWER
for i in range(len(questions)):
    if len(questions[i])<15:
        sorted_ques.append(questions[i])
        sorted_ansr.append(answers[i])
del(i)

#CLEANING DATA

import re
def clean_text(text):
    text = text.lower()
    text = re.sub(r"i'm", "i am", text)
    text = re.sub(r"he's", "he is", text)
    text = re.sub(r"she's", "she is", text)
    text = re.sub(r"that's", "that is", text)
    text = re.sub(r"what's", "what is", text)
    text = re.sub(r"where's", "where is", text)
    text = re.sub(r"\'ll", " will", text)
    text = re.sub(r"\'ve", " gave", text)
    text = re.sub(r"don't", "do not", text)
    text = re.sub(r"\'re", " are", text)
    text = re.sub(r"\'d", " would", text)
    text = re.sub(r"won't", "will not", text)
    text = re.sub(r"can't", "can not", text)
    text = re.sub(r"[-()\"@/#:<>{}+=~\|?,]", "", text)
    return text

cleaned_ques = []
cleaned_ansr = []

for line in sorted_ques:
    cleaned_ques.append(clean_text(line))


for line in sorted_ansr:
    cleaned_ansr.append(clean_text(line))

for i in range(len(cleaned_ansr)):
    cleaned_ansr[i] = ' '.join(cleaned_ansr[i].split()[:11])

del(answers, i, line, questions, sorted_ansr, sorted_ques)

cleaned_ques = cleaned_ques[:30000]
cleaned_ansr = cleaned_ansr[:30000]

word2count = {}

for line in cleaned_ques:
    for word in line.split():
        if word not in word2count:
            word2count[word]=1
        else:
            word2count[word] +=1
            
for line in cleaned_ansr:
    for word in line.split():
        if word not in word2count:
            word2count[word]=1
        else:
            word2count[word] +=1
del(word,line)

thresh = 5

vocab = {}
word_num = 0

for word, count in word2count.items():
    if count >=thresh:
        vocab[word]=word_num
        word_num +=1
        
del(word2count, word, count, thresh, word_num)

for i in range(len(cleaned_ansr)):
    cleaned_ansr[i]='<SOS> ' + cleaned_ansr[i] + ' <EOS>'
    
tokens = ['<PAD>', '<EOS>', '<OUT>', '<SOS>']
x = len(vocab)

for token in tokens:
    vocab[token] = x
    x += 1

vocab['cameron'] = vocab['<PAD>']
vocab['<PAD>'] = 0

del(token, tokens, x)
del(i)
inv_vocab = {w:v for v,w in vocab.items()}


encoder_inp = []
for line in cleaned_ques:
    lst = []
    for word in line.split():
        if word not in vocab:
            lst.append(vocab['<OUT>'])
        else:
            lst.append(vocab[word])
    encoder_inp.append(lst)
    
decorder_inp = []
for line in cleaned_ansr:
    lst = []
    for word in line.split():
        if word not in vocab:
            lst.append(vocab['<OUT>'])
        else:
            lst.append(vocab[word])
    decorder_inp.append(lst)



del(cleaned_ansr, cleaned_ques, line, lst, word)

from keras.preprocessing.sequence import pad_sequences
encoder_inp = pad_sequences(encoder_inp, 13, padding='post', truncating='post')
decorder_inp = pad_sequences(decorder_inp, 13, padding='post', truncating='post')


decoder_final_output = []

for i in decorder_inp:
    decoder_final_output.append(i[1:])

decoder_final_output = pad_sequences(decoder_final_output, 13, padding="post", truncating="post")


from tensorflow.keras.utils import to_categorical
decoder_final_output = to_categorical(decoder_final_output, len(vocab))

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

model.fit([encoder_inp, decorder_inp], decoder_final_output, epochs=40)









