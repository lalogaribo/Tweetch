import React from 'react';
import {Field, reduxForm} from "redux-form";

class StreamForm extends React.Component {

	renderError({error, touched}) {
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			)
		}
	}

	renderInput = ({input, label, meta}) => {
		const className = `field ${meta.error && meta.touched ? 'error' : ''}`
		return (
			<div className={className}>
				<label>{label}</label>
				<input type="text" {...input} autoComplete='off'/>
				{this.renderError(meta)}
			</div>
		)
	}

	submitForm = (values) => {
		this.props.onSubmit(values)
	}

	render() {
		const {handleSubmit} = this.props
		return (
			<div>
				<form className='ui form error' onSubmit={handleSubmit(this.submitForm)}>
					<Field name='title' component={this.renderInput} label='Enter Title'/>
					<Field name='description' component={this.renderInput} label='Enter description'/>
					<button className='ui button primary'>Create stream</button>
				</form>
			</div>
		)
	}
};

const validate = ({title, description}) => {
	const errors = {}
	if (!title || title === '') errors.title = 'Title is required'
	if (!description || description === '') errors.description = 'Description is required'
	return errors
}

export default reduxForm({
	form: 'streamForm',
	validate
})(StreamForm);

