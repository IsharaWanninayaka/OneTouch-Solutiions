import React from 'react';
import { Link } from 'react-router-dom';

function About() {
    const teamMembers = [
        {
            name: 'John Smith',
            role: 'CEO & Founder',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            bio: '10+ years in software development and business strategy.'
        },
        {
            name: 'Sarah Johnson',
            role: 'CTO',
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            bio: 'Expert in cloud architecture and scalable systems.'
        },
        {
            name: 'Mike Chen',
            role: 'Lead Developer',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            bio: 'Full-stack developer with focus on React and Node.js.'
        },
        {
            name: 'Emily Davis',
            role: 'UI/UX Designer',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            bio: 'Creative designer passionate about user-centered design.'
        }
    ];

    const values = [
        {
            icon: 'fas fa-bullseye',
            title: 'Excellence',
            description: 'We strive for excellence in every project, delivering quality that exceeds expectations.'
        },
        {
            icon: 'fas fa-lightbulb',
            title: 'Innovation',
            description: 'We embrace new technologies and creative approaches to solve complex problems.'
        },
        {
            icon: 'fas fa-handshake',
            title: 'Partnership',
            description: 'We build long-term relationships with our clients based on trust and collaboration.'
        },
        {
            icon: 'fas fa-rocket',
            title: 'Growth',
            description: 'We help our clients grow by delivering solutions that drive business success.'
        }
    ];

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="py-20 gradient-bg">
                <div className="container px-4 mx-auto md:px-6">
                    <div className="text-center text-white">
                        <h1 className="mb-6 text-4xl font-bold md:text-5xl">About TechSolutions</h1>
                        <p className="max-w-2xl mx-auto text-xl text-indigo-100">
                            We are a team of passionate developers, designers, and innovators committed to transforming ideas into digital reality.
                        </p>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20 bg-white">
                <div className="container px-4 mx-auto md:px-6">
                    <div className="flex flex-col items-center gap-12 md:flex-row">
                        <div className="md:w-1/2">
                            <h2 className="mb-6 text-3xl font-bold text-gray-800 md:text-4xl">Our Story</h2>
                            <p className="mb-6 text-lg text-gray-600">
                                Founded in 2018, TechSolutions started as a small team of developers with a shared vision: 
                                to create digital solutions that make a real impact on businesses and people's lives.
                            </p>
                            <p className="mb-6 text-lg text-gray-600">
                                Over the years, we've grown into a full-service digital agency, but our core philosophy remains the same: 
                                understand our clients' needs deeply and deliver solutions that exceed expectations.
                            </p>
                            <p className="text-lg text-gray-600">
                                Today, we're proud to have helped over 50 businesses transform their digital presence and achieve their goals.
                            </p>
                        </div>
                        <div className="md:w-1/2">
                            <div className="p-8 bg-gray-100 rounded-2xl">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="text-center">
                                        <div className="mb-2 text-3xl font-bold text-indigo-600">5+</div>
                                        <div className="text-gray-600">Years Experience</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="mb-2 text-3xl font-bold text-indigo-600">50+</div>
                                        <div className="text-gray-600">Projects Delivered</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="mb-2 text-3xl font-bold text-indigo-600">15+</div>
                                        <div className="text-gray-600">Team Members</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="mb-2 text-3xl font-bold text-indigo-600">98%</div>
                                        <div className="text-gray-600">Client Satisfaction</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-gray-50">
                <div className="container px-4 mx-auto md:px-6">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">Our Values</h2>
                        <p className="max-w-2xl mx-auto text-xl text-gray-600">
                            The principles that guide everything we do at TechSolutions.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {values.map((value, index) => (
                            <div key={index} className="text-center">
                                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-lg gradient-bg">
                                    <i className={`${value.icon} text-white text-2xl`}></i>
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-gray-800">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-white">
                <div className="container px-4 mx-auto md:px-6">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">Meet Our Team</h2>
                        <p className="max-w-2xl mx-auto text-xl text-gray-600">
                            The talented individuals behind our success stories.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="text-center">
                                <div className="w-32 h-32 mx-auto mb-6 overflow-hidden border-4 border-indigo-100 rounded-full">
                                    <img 
                                        src={member.image} 
                                        alt={member.name}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-gray-800">{member.name}</h3>
                                <p className="mb-3 font-medium text-indigo-600">{member.role}</p>
                                <p className="text-sm text-gray-600">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 gradient-bg">
                <div className="container px-4 mx-auto text-center md:px-6">
                    <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">Ready to Work With Us?</h2>
                    <p className="max-w-2xl mx-auto mb-8 text-xl text-indigo-100">
                        Let's discuss your project and see how we can help bring your ideas to life.
                    </p>
                    <Link to="/contact" className="px-8 py-3 font-semibold text-indigo-600 transition duration-300 bg-white rounded-lg hover:bg-indigo-50">
                        Get In Touch
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default About;