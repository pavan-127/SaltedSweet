import "bootstrap/dist/css/bootstrap.min.css";

function ContactUs() {
    return (
        <>
            {/* Contact Form Section */}
            <section id="contact-us" className="container text-center mt-5 py-5">
                <h1 className="text-danger fw-bold">How Can We Help You?</h1>
                <p className="text-muted">We'd love to hear from you! Fill out the form below.</p>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form className="text-start">
                            <div className="mb-2">
                                <label className="form-label">Name</label>
                                <input type="text" className="form-control" placeholder="Enter your name" />
                            </div>
                            <div className="mb-2">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" placeholder="Enter your email" />
                            </div>
                            <div className="mb-4">
                                <label className="form-label">Mobile No</label>
                                <input type="tel" className="form-control" placeholder="Enter your mobile number" />
                            </div>
                            <div className="mb-5">
                                <label className="form-label">Feedback</label>
                                <textarea className="form-control" rows="3" placeholder="Write your feedback"></textarea>
                            </div>
                            <button type="submit" className="btn btn-danger w-100">Submit</button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="text-center py-1 text-light fixed-bottom border-top -webkit-backdrop-filter: blur(15px);">
                <p className="mb-0">&copy; 2025 Food Delivery Service. All rights reserved.</p>
            </footer>
                
            
        </>
    );
}

export default ContactUs;
