import React from 'react';
import { Link } from 'react-router-dom';

function Services() {
    const services = [
        {
            icon: 'fas fa-globe',
            title: 'Web Development',
            description: 'Custom websites with modern designs, responsive layouts, and optimal performance for all devices.',
            features: ['Responsive Design', 'SEO Optimization', 'Fast Loading', 'Modern UI/UX'],
            price: 'Starting at $1,499'
        },
        {
            icon: 'fas fa-laptop-code',
            title: 'Custom Web Apps',
            description: 'Tailored web applications that solve specific business challenges with scalable architecture.',
            features: ['Custom Solutions', 'Scalable Architecture', 'API Integration', 'Cloud Deployment'],
            price: 'Starting at $4,999'
        },
        {
            icon: 'fas fa-mobile-alt',
            title: 'Mobile Apps',
            description: 'Native and cross-platform mobile applications for iOS and Android with engaging user experiences.',
            features: ['iOS & Android', 'Cross-Platform', 'User-Friendly', 'App Store Ready'],
            price: 'Starting at $6,999'
        },
        {
            icon: 'fas fa-microchip',
            title: 'Software + Hardware',
            description: 'Integrated solutions combining custom software with specialized hardware for unique business needs.',
            features: ['IoT Solutions', 'Embedded Systems', 'Custom Hardware', 'Full Integration'],
            price: 'Custom Quote'
        },
        {
            icon: 'fas fa-shopping-cart',
            title: 'E-Commerce Solutions',
            description: 'Complete online store development with payment integration and inventory management.',
            features: ['Payment Gateway', 'Inventory System', 'Admin Dashboard', 'Security'],
            price: 'Starting at $3,499'
        },
        {
            icon: 'fas fa-cloud',
            title: 'Cloud Solutions',
            description: 'Cloud infrastructure setup, migration, and management for scalable business applications.',
            features: ['AWS/Azure/GCP', 'Serverless Architecture', 'Database Management', 'DevOps'],
            price: 'Starting at $2,999'
        }
    ];

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="py-20 gradient-bg">
                <div className="container px-4 mx-auto md:px-6">
                    <div className="text-center text-white">
                        <h1 className="mb-6 text-4xl font-bold md:text-5xl">Our Services</h1>
                        <p className="max-w-2xl mx-auto text-xl text-indigo-100">
                            Comprehensive digital solutions tailored to drive your business growth and innovation.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 bg-white">
                <div className="container px-4 mx-auto md:px-6">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {services.map((service, index) => (
                            <div key={index} className="p-6 transition-all duration-300 border border-gray-100 shadow-md service-card bg-gray-50 rounded-xl hover:shadow-xl">
                                <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-lg gradient-bg">
                                    <i className={`${service.icon} text-white text-2xl`}></i>
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-gray-800">{service.title}</h3>
                                <p className="mb-4 text-gray-600">{service.description}</p>
                                <div className="mb-4">
                                    <span className="text-2xl font-bold text-indigo-600">{service.price}</span>
                                </div>
                                <ul className="mb-6 space-y-2">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-gray-700">
                                            <i className="mr-2 text-green-500 fas fa-check"></i>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button className="w-full px-6 py-3 font-semibold text-white transition duration-300 bg-indigo-600 rounded-lg hover:bg-indigo-700">
                                    Get Started
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gray-50">
                <div className="container px-4 mx-auto text-center md:px-6">
                    <h2 className="mb-6 text-3xl font-bold text-gray-800 md:text-4xl">Ready to Start Your Project?</h2>
                    <p className="max-w-2xl mx-auto mb-8 text-xl text-gray-600">
                        Let's discuss your requirements and create a solution that drives your business forward.
                    </p>
                    <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                        <Link to="/contact" className="px-8 py-3 font-semibold text-white transition duration-300 bg-indigo-600 rounded-lg hover:bg-indigo-700">
                            Get Free Consultation
                        </Link>
                        <button className="px-8 py-3 font-semibold text-indigo-600 transition duration-300 bg-white border border-indigo-600 rounded-lg hover:bg-indigo-50">
                            Call Us: +1 (555) 123-4567
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Services;