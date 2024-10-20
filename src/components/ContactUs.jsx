import '../styles/ContactUs.css';



function ContactUs() {
	return (
		<div className='main-contact'>
			<div className='header'>
				<h1>CONTACT</h1>
				<p>
					have any questions or need assistance? <br />
					reach out us using the form below. and feel free to get in touch with
					us,
					<br /> we are here to help!
				</p>
			</div>
			<div className='form'>
				<div className='name'>
					<label>full name</label>
					<input type='text' />
				</div>
				<div className='user'>
					<div className='user-email'>
						<label>email</label>
						<input type='text' />
					</div>
					<div className='user-phone'>
						<label type='email'>phone number</label>
						<input type='text' />
					</div>
				</div>
				<div className='text-area'>
					<label>message</label>
					<textarea name='text' id='' defaultValue='message'></textarea>
				</div>
				<div className='submit'>
					<button id='btn'>submit</button>
				</div>
			</div>
		</div>
	);
}

export default ContactUs;
