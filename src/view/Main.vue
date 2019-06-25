<template>
  <div class="container">
    <div class="title">
      <h2>Question & Answers Demo</h2>
    </div>
    <div class="row">
      <div class="col-md-8 col-md-offset-2 col-xs-12">
        <div class="form-group">
          <label for="context">Context</label>
          <textarea class="form-control" id="context" rows="5"></textarea>
        </div>
        <div class="form-group">
          <label for="exampleQuestion1">Question 1</label>
          <input type="text" class="form-control" id="exampleQuestion1" placeholder="Enter question">
          <small id="answer1" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="exampleQuestion2">Question 2</label>
          <input type="text" class="form-control" id="exampleQuestion2" placeholder="Enter question">
          <small id="answer2" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <button type="submit" class="btn btn-primary" @click="submit">Find Answers</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import * as config from '../../config';

export default {
  data() {
    return {
      num: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      inputs: [],
      feedForward: [],
      convolution: [],
      results: [],
      currentNumber: '',
      showInfo: false
    };
  },
  methods: {
    submit() {
      this.inputs = canvas.inputs;
      axios
        .post(`${config.API_ROOT}/recognition`, this.inputs)
        .then(res => {
          this.feedForward = this.transformer(res.data.results[0]);
          this.convolution = this.transformer(res.data.results[1]);
          this.results[0] = this.feedForward.indexOf(Math.max.apply(null, this.feedForward))
          this.results[1] = this.convolution.indexOf(Math.max.apply(null, this.convolution))
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    clear() {
      canvas = new Canvas();
      this.inputs = [],
      this.feedForward = [],
      this.convolution = [],
      this.results = []
    },
    transformer(data) {
      return data.map(item => {
        return + item.toFixed(8);
      })
    },
    feedback() {
      this.currentNumber = '';
      this.showInfo = true;

      axios
        .post(`${config.API_ROOT}/feedback`, { image: this.inputs, label: this.currentNumber })
        .then(res => {})
        .catch(function(error) {
          console.log(error);
        });

      setTimeout(() => {
        this.showInfo = false;
      }, 3000);
    }
  }
};
</script>

<style>
.title {
  text-align: center;
  margin: 5% 0 5%;
}

.line {
  border-top: 1px solid #ddd;
}

label {
  font-size: 18px;
}

p {
  font-size: 20px;
  font-weight: bold;
}

.form-group {
  padding-bottom: 20px;
}
</style>
