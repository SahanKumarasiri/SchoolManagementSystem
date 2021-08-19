import React from "react";

export default function Footer(){
    return(
        <footer className="text-center text-lg-start bg-light text-muted">
           
            <section
                className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"
            >
                <div>
                <a href="" className="me-4 text-reset">
                    <i className="fab fa-facebook-f"></i>
                </a>
                <a href="" className="me-4 text-reset">
                    <i className="fab fa-twitter"></i>
                </a>
                <a href="" className="me-4 text-reset">
                    <i className="fab fa-google"></i>
                </a>
                <a href="" className="me-4 text-reset">
                    <i className="fab fa-instagram"></i>
                </a>
                <a href="" className="me-4 text-reset">
                    <i className="fab fa-linkedin"></i>
                </a>
                <a href="" className="me-4 text-reset">
                    <i className="fab fa-github"></i>
                </a>
                </div>
               
            </section>
            
            
            <section className="">
                <div className="container text-center text-md-start mt-5">
                
                <div className="row mt-3">
                  
                    <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                   
                    <h6 className="text-uppercase fw-bold mb-4">
                        <i className="fas fa-gem me-3"></i>Motto
                    </h6>
                    <p>
                    A Building With Four Walls And Tomorrow Inside.
                    </p>
                    </div>
                    
                    <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                
                    <h6 className="text-uppercase fw-bold mb-4">
                        Productivity
                    </h6>
                    <p>
                        <a href="#!" className="text-reset">Graduate school</a>
                    </p>
                    <p>
                        <a href="#!" className="text-reset">Courses</a>
                    </p>
                    <p>
                        <a href="#!" className="text-reset">Certification </a>
                    </p>
                    <p>
                        <a href="#!" className="text-reset">Books and blogs</a>
                    </p>
                    </div>
                    <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                   
                    <h6 className="text-uppercase fw-bold mb-4">
                        Useful links
                    </h6>
                    <p>
                        <a href="#!" className="text-reset">Quizlet</a>
                    </p>
                    <p>
                        <a href="#!" className="text-reset">Grammarly</a>
                    </p>
                    <p>
                        <a href="#!" className="text-reset">Wolfram Alpha</a>
                    </p>
                    <p>
                        <a href="#!" className="text-reset">Help</a>
                    </p>
                    </div>
                   
                    <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                   
                    <h6 className="text-uppercase fw-bold mb-4">
                        Contact
                    </h6>
                    <p><i className="fas fa-home me-3"></i> Ibbagamuwa, NY 10012, Kurunegala</p>
                    <p>
                        <i className="fas fa-envelope me-3"></i>
                        info@centralcollege.com
                    </p>
                    <p><i className="fas fa-phone me-3"></i> + 94 37 567 5423</p>
                    <p><i className="fas fa-print me-3"></i> + 94 77 613 5690</p>
                    </div>
                
                </div>
                </div>
            </section>
            <div className="text-center p-4" >
                © 2021 Copyright:
                <a className="text-reset fw-bold" href="https://mdbootstrap.com/">ibbagamuwacentralcollege.com</a>
            </div>
           
        </footer>
    
    )
}