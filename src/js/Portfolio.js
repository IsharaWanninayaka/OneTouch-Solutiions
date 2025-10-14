import React, { useState } from 'react';

function Portfolio() {
    const [activeFilter, setActiveFilter] = useState('all');

    const projects = [
        {
            id: 1,
            title: 'E-Commerce Platform',
            category: 'web',
            description: 'A full-featured online shopping platform with inventory management and payment processing.',
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            link: '#'
        },
        {
            id: 2,
            title: 'Health Tracking App',
            category: 'mobile',
            description: 'Mobile application for tracking fitness activities, nutrition, and health metrics.',
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
            technologies: ['React Native', 'Firebase', 'Redux'],
            link: '#'
        },
        {
            id: 3,
            title: 'Inventory Management System',
            category: 'web',
            description: 'Enterprise inventory management solution with real-time tracking and analytics.',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
            technologies: ['Vue.js', 'Python', 'PostgreSQL'],
            link: '#'
        },
        {
            id: 4,
            title: 'Smart Home System',
            category: 'iot',
            description: 'Integrated smart home solution with mobile control and automation features.',
            image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
            technologies: ['IoT', 'React Native', 'AWS IoT'],
            link: '#'
        },
        {
            id: 5,
            title: 'Food Delivery App',
            category: 'mobile',
            description: 'Restaurant and food delivery application with real-time tracking.',
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
            technologies: ['Flutter', 'Node.js', 'MongoDB'],
            link: '#'
        },
        {
            id: 6,
            title: 'CRM System',
            category: 'web',
            description: 'Customer relationship management system for sales and support teams.',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
            technologies: ['Angular', 'Java', 'MySQL'],
            link: '#'
        }
    ];

    const filters = [
        { key: 'all', label: 'All Projects' },
        { key: 'web', label: 'Web Development' },
        { key: 'mobile', label: 'Mobile Apps' },
        { key: 'iot', label: 'IoT Solutions' }
    ];

    const filteredProjects = activeFilter === 'all' 
        ? projects 
        : projects.filter(project => project.category === activeFilter);

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="py-20 gradient-bg">
                <div className="container px-4 mx-auto md:px-6">
                    <div className="text-center text-white">
                        <h1 className="mb-6 text-4xl font-bold md:text-5xl">Our Portfolio</h1>
                        <p className="max-w-2xl mx-auto text-xl text-indigo-100">
                            Explore our successful projects and see how we've helped businesses transform their digital presence.
                        </p>
                    </div>
                </div>
            </section>

            {/* Filter Section */}
            <section className="py-12 bg-white">
                <div className="container px-4 mx-auto md:px-6">
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        {filters.map(filter => (
                            <button
                                key={filter.key}
                                onClick={() => setActiveFilter(filter.key)}
                                className={`px-6 py-3 rounded-lg font-medium transition duration-300 ${
                                    activeFilter === filter.key
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {filteredProjects.map(project => (
                            <div key={project.id} className="overflow-hidden transition duration-300 bg-white shadow-lg rounded-xl hover:shadow-xl">
                                <div className="h-48 overflow-hidden">
                                    <img 
                                        src={project.image} 
                                        alt={project.title}
                                        className="object-cover w-full h-full transition duration-500 hover:scale-105"
                                    />
                                </div>
                                <div className="p-6">
                                    <span className="px-3 py-1 text-sm font-medium text-indigo-600 rounded-full bg-indigo-50">
                                        {project.category.toUpperCase()}
                                    </span>
                                    <h3 className="mt-3 mb-2 text-xl font-bold text-gray-800">{project.title}</h3>
                                    <p className="mb-4 text-gray-600">{project.description}</p>
                                    
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.map((tech, index) => (
                                            <span key={index} className="px-2 py-1 text-xs text-gray-700 bg-gray-100 rounded">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    
                                    <button className="w-full px-4 py-2 font-medium text-white transition duration-300 bg-indigo-600 rounded-lg hover:bg-indigo-700">
                                        View Case Study
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-gray-50">
                <div className="container px-4 mx-auto md:px-6">
                    <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
                        <div>
                            <div className="mb-2 text-4xl font-bold text-indigo-600 md:text-5xl">50+</div>
                            <div className="text-gray-600">Projects Completed</div>
                        </div>
                        <div>
                            <div className="mb-2 text-4xl font-bold text-indigo-600 md:text-5xl">35+</div>
                            <div className="text-gray-600">Happy Clients</div>
                        </div>
                        <div>
                            <div className="mb-2 text-4xl font-bold text-indigo-600 md:text-5xl">15+</div>
                            <div className="text-gray-600">Team Members</div>
                        </div>
                        <div>
                            <div className="mb-2 text-4xl font-bold text-indigo-600 md:text-5xl">98%</div>
                            <div className="text-gray-600">Client Satisfaction</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Portfolio;