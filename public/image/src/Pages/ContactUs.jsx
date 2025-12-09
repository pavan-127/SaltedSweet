import "bootstrap/dist/css/bootstrap.min.css";

function ContactUs() {
    return (
        <>
            {/* Contact Form Section */}
            <section id="contact-us" className="container text-center mt-5 py-5">
                <h1 className="text-danger fw-bold">How Can We Help You?</h1>
                <p className=" text-white">We'd love to hear from you! Fill out the form below.</p>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form className="text-start">
                            <div className="mb-2">
                                <label className="form-label text-white">Name</label>
                                <input type="text" className="form-control" placeholder="Enter your name" />
                            </div>
                            <div className="mb-2">
                                <label className="form-label  text-white">Email</label>
                                <input type="email" className="form-control" placeholder="Enter your email" />
                            </div>
                            <div className="mb-4">
                                <label className="form-label text-white">Mobile No</label>
                                <input type="tel" className="form-control" placeholder="Enter your mobile number" />
                            </div>
                            <div className="mb-5">
                                <label className="form-label text-white">Feedback</label>
                                <textarea className="form-control" rows="3" placeholder="Write your feedback"></textarea>
                            </div>
                            <button type="submit" className="btn btn-danger w-100">Submit</button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="Footer text-center py-2 text-dark">
                <div className="container">
                    <p className="mb-1">&copy; 2025 Food Delivery Service. All rights reserved.</p>
                </div>
            </footer>
                
            
        </>
    );
}

export default ContactUs;
