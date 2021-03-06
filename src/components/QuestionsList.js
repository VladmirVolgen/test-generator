import React, {Component} from 'react';

class QuestionsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionNum: 1,
            question: this.props.questions[0].question,
            answer: this.props.questions[0].answer,
            userAnswer: "",
            fail: false,
            correctQuestions: 0,
            incorrectQuestions: 0
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRandomize = this.handleRandomize.bind(this);
        this.getAnswer = this.getAnswer.bind(this);
    }



    handleSubmit(event) {
        event.preventDefault();
        //Correct answer
        if (this.state.answer.toLowerCase() === this.state.userAnswer.toLowerCase()) {
            let questionNum = this.state.questionNum;
            if (questionNum >= this.props.questions.length) {
                questionNum = 0
            }
            this.setState({ questionNum: questionNum + 1, question: this.props.questions[questionNum].question, answer: this.props.questions[questionNum].answer, fail: false, correctQuestions: this.state.correctQuestions + 1, userAnswer: ""}) 
           //Reset input in form
           const answer = document.querySelector('#answer')
           answer.value = ""
        
        //Incorrect answer
        } else {
            this.setState({fail: true, incorrectQuestions: this.state.incorrectQuestions + 1})
        }

    }

    handleChange(event) {
        this.setState({userAnswer: event.target.value})
    }

    handleRandomize(event) {
        event.preventDefault();

        function generateRandomNumber(min, max) {
            let random_number = Math.random() * (max - min) + min;
            return Math.floor(random_number);
        }

        const number = generateRandomNumber(0, this.props.questions.length);
    
        this.setState({questionNum: number + 1, answer: this.props.questions[number].answer, fail: false})
        
        
    }

    getAnswer(event) {
        const input = document.querySelector('#answer')
        input.value = this.state.answer;
        this.setState({correctQuestions: this.state.correctQuestions - 1, incorrectQuestions: this.state.incorrectQuestions + 1, userAnswer: this.state.answer})
    }

    correctAnswersPercentage() {
        let result = 0

        if (this.state.correctQuestions > 0) {
            const questions = this.state.correctQuestions + this.state.incorrectQuestions;
            result = (100 * this.state.correctQuestions) / questions
            result = result.toFixed(2)
        }

        return result;
    }

    

    render() {

        const correctAnswersPercentage = this.correctAnswersPercentage();

        let fail;

        if (!this.state.fail) {
            fail = ""
        } else {
            fail = <h3> "Incorrect, please try again" </h3>
        }

        return(
            <div>
                
                <h2>Question {this.state.questionNum}:</h2>
                <h3>{this.state.question}</h3>

                <h3>Write your answer</h3>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" id="answer" autocomplete="off" onChange={this.handleChange} />
                    <button type="submit">Submit</button>
                    {fail}
                </form>

                <button onClick={this.handleRandomize}>Randomize question</button>

                <button onClick={this.getAnswer}>Show me the answer</button>

                <p>You have answered {this.state.correctQuestions} questions right and {this.state.incorrectQuestions} questions wrong</p>
                <p>The percentage of correct answers is {correctAnswersPercentage}%</p>
                
            </div>
        )
    }

}

export default QuestionsList;