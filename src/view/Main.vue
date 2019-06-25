<template>
  <div class="container">
    <div class="title">
      <h2>Question & Answers Demo</h2>
    </div>
    <div class="row">
      <div class="col-md-8 col-md-offset-2 col-xs-12">
        <div class="form-group">
          <label for="context">Context</label>
          <textarea class="form-control" id="context" rows="7" v-model="params.context"></textarea>
        </div>
        <div class="form-group">
          <label for="exampleQuestion1">Question 1</label>
          <input type="text" class="form-control" id="exampleQuestion1" placeholder="Enter question1" v-model="params.question1">
          <small id="answer1" class="form-text text-muted answer-color" v-if="answer1">{{ `Answer1: ${answer1}` }}</small>
        </div>
        <div class="form-group">
          <label for="exampleQuestion2">Question 2</label>
          <input type="text" class="form-control" id="exampleQuestion2" placeholder="Enter question2" v-model="params.question2">
          <small id="answer2" class="form-text text-muted answer-color" v-if="answer2">{{ `Answer2: ${answer2}` }}</small>
        </div>
        <button type="clear" class="btn btn-secondary" @click="clear">Clear All</button>
        <button type="submit" class="btn btn-info" @click="submit">Find Answers</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import NProgress from 'nprogress';
import * as config from '../../config';

export default {
  data() {
    return {
      params: {
        context: '',
        question1: '',
        question2: '',
      },
      answer1: '',
      answer2: '',
    };
  },
  methods: {
    submit() {
      const qas = [];
      if (this.params.question1) { qas.push({ 'id': 1, 'question': this.params.question1 }) }
      if (this.params.question2) { qas.push({ 'id': 2, 'question': this.params.question2 }) }
      const data = [
        {
          'title': 'test_demo',
          'paragraphs': [
            {
              'context': this.params.context,
              'qas': qas,
            }
          ]
        }
      ];
      NProgress.start();
      axios
        .post(`${config.API_ROOT}/test`, data)
        .then(res => {
          const results = JSON.parse(res.data.results);
          this.answer1 = results['1'] || '';
          this.answer2 = results['2'] || '';
          NProgress.done();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    clear() {
      this.params.context = '';
      this.params.question1 = '';
      this.params.question2 = '';
      this.answer1 = '';
      this.answer2 = '';
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

.answer-color {
  margin-top: 10px;
  color: crimson;
  font-size: 14px;
}

p {
  font-size: 20px;
  font-weight: bold;
}

.form-group {
  padding-bottom: 20px;
}
</style>
