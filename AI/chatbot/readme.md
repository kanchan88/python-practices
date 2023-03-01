# Seq2Seq Model
Seq2Seq is a method of encoder-decoder based Deep Learning Model that maps an input of sequence to an output of sequence. The idea is to use 2 RNNs that will work together with a special token and try to predict the next state sequence from the previous sequence. Encoders and Decoders are simply LSTM cells which is based on RNN.

Encoder-It accepts a single element of the input sequence at each time step, process it, collects information for that element and propagates it forward.

Intermediate vector- This is the final internal state produced from the encoder part of the model. It contains information about the entire input sequence to help the decoder make accurate predictions.

Decoder- given the entire sentence, it predicts an output at each time step.

## Considerations
This is simple bot with less data and training. Use more data for accuracy. Moreover, do consider Attention Mechanism to make prediction more accurate. Attention Mechanism helps to translate like human does :)
