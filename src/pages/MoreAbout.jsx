import React from "react";
import { useNavigate } from "react-router-dom";

function LearnMoreAboutUs() {
  const navigate = useNavigate();
  const teamMembers = [
    {
      name: "D.L Somarathna",
      role: "Founder",
      image: "/images/dinesh.jpg",
      bio: "With over 15 years of experience in business strategy and leadership, His strategic mindset and commitment to excellence have guided multiple teams toward building impactful digital solutions.",
      social: {
        linkedin: "#",
        github: "#",
        email: "dinesh@onetouchsolution.com",
      },
    },
    {
      name: "K.A Namal Sandun",
      role: "Founder",
      image: "/images/namal.png",
      bio: "With 10+ years of experience in digital branding, creative marketing, and business growth strategy.focuses on driving engagement through innovation and empowering brands to achieve potential in the digital landscape.",
      social: {
        linkedin: "#",
        github: "#",
        email: "sarah@onetouchsolution.com",
      },
    },
    {
      name: "W.M.I.S Wanninayaka",
      role: "Lead Developer",
      image: "/images/ishara.jpg",
      bio: "Vision-driven entrepreneur with a strong foundation in software development and management. Passionate about innovation, delivering real impact for clients.",
      social: {
        linkedin: "#",
        github: "#",
        email: "mike@onetouchsolution.com",
      },
    },
    {
      name: "W.M.S.D Wanasinghe",
      role: "Lead Developer",
      image: "/images/devinda.png",
      bio: "Experienced in deployment strategies, version control, and agile project management. Ensures every project moves smoothly from development to delivery with precision and reliability",
      social: {
        linkedin: "#",
        github: "#",
        email: "emily@onetouchsolution.com",
      },
    },
    {
      name: "R.A Lakmal",
      role: "Lead Developer",
      image: "/images/anushka.jpg",
      bio: "Specialized in modern frontend technologies and UI/UX design. Skilled at crafting responsive, user-friendly interfaces while maintaining strong testing and quality standards.",
      social: {
        linkedin: "#",
        github: "#",
        email: "emily@onetouchsolution.com",
      },
    },
    {
      name: "M.D Shanilka Hirushan",
      role: "Lead Developer",
      image: "/images/shanilka.png",
      bio: "Focused on backend architecture and API development with a creative eye for design. Ensures stability, performance, and usability through thorough testing and clean coding practices.",
      social: {
        linkedin: "#",
        github: "#",
        email: "emily@onetouchsolution.com",
      },
    },
  ];

  const values = [
    {
      icon: "fas fa-handshake",
      title: "Client Partnership",
      description:
        "We build long-term relationships based on trust and mutual success.",
    },
    {
      icon: "fas fa-lightbulb",
      title: "Innovation",
      description:
        "Constantly exploring new technologies and creative solutions.",
    },
    {
      icon: "fas fa-chart-line",
      title: "Growth",
      description:
        "Committed to our clients' growth and our team's continuous learning.",
    },
    {
      icon: "fas fa-shield-alt",
      title: "Quality",
      description: "Never compromising on quality, security, or performance.",
    },
  ];

  const milestones = [
    {
      year: "2022",
      event: "Company Founded",
      description:
        "Started with a vision to deliver exceptional digital solutions",
    },
    {
      year: "2023",
      event: "First 10 Projects",
      description: "Reached milestone of 10 successful project deliveries",
    },
    {
      year: "2024",
      event: "Team Expansion",
      description: "Grew to 10+ dedicated professionals",
    },
    {
      year: "2025",
      event: "IoT Division",
      description: "Launched specialized software+hardware solutions",
    },
    {
      year: "2025",
      event: "50+ Projects",
      description: "Celebrated 50+ completed projects across industries",
    },
  ];

  return (
    <div className="min-h-screen pt-24 bg-gray-50">
      {/* Hero Section */}
      <section className="py-12 gradient-bg md:py-20">
        <div className="container px-4 mx-auto md:px-6">
          <div className="text-center text-white">
            <h1 className="mb-6 text-3xl font-bold md:text-5xl lg:text-6xl">
              About OneTouch Solution
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-indigo-100 md:text-xl">
              We're more than just a development company - we're your partners
              in digital transformation, dedicated to turning your vision into
              reality through innovative technology solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 bg-white md:py-20">
        <div className="container px-4 mx-auto md:px-6">
          <div className="flex flex-col items-center lg:flex-row">
            <div className="mb-10 lg:w-1/2 lg:mb-0 lg:pr-8">
              <h2 className="mb-6 text-2xl font-bold text-gray-800 md:text-4xl">
                Our Story
              </h2>
              <p className="mb-6 text-base text-gray-600 md:text-lg">
                Founded in 2022, OneTouch Solution began with a simple mission:
                to make advanced technology accessible and beneficial for
                businesses of all sizes. What started as a small team of
                passionate developers has grown into a full-service digital
                agency.
              </p>
              <p className="mb-6 text-base text-gray-600 md:text-lg">
                We've evolved from basic web development to comprehensive
                digital solutions, including custom software, mobile
                applications, and integrated hardware systems. Our journey has
                been guided by our commitment to quality, innovation, and client
                success.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8 md:gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600 md:text-3xl">
                    3+
                  </div>
                  <div className="text-sm text-gray-600 md:text-base">
                    Years Experience
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600 md:text-3xl">
                    50+
                  </div>
                  <div className="text-sm text-gray-600 md:text-base">
                    Projects Delivered
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600 md:text-3xl">
                    98%
                  </div>
                  <div className="text-sm text-gray-600 md:text-base">
                    Client Satisfaction
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600 md:text-3xl">
                    15+
                  </div>
                  <div className="text-sm text-gray-600 md:text-base">
                    Team Members
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center lg:w-1/2">
              <div className="relative">
                <img
                  src="/images/iot.png"
                  alt="Our Journey"
                  className="w-full max-w-md shadow-2xl rounded-2xl"
                />
                <div className="absolute p-4 bg-white shadow-lg -bottom-4 -left-4 rounded-xl md:p-6 md:-bottom-6 md:-left-6">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 mr-3 rounded-full gradient-bg md:w-12 md:h-12 md:mr-4">
                      <i className="text-white fas fa-trophy"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-12 bg-gray-50 md:py-20">
        <div className="container px-4 mx-auto md:px-6">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-2xl font-bold text-gray-800 md:text-4xl">
              Our Values
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 md:text-xl">
              These principles guide everything we do and define who we are as a
              company.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-6 text-center transition duration-300 bg-white shadow-lg rounded-xl hover:shadow-xl"
              >
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full gradient-bg md:w-16 md:h-16">
                  <i
                    className={`${value.icon} text-white text-xl md:text-2xl`}
                  ></i>
                </div>
                <h3 className="mb-3 text-lg font-bold text-gray-800 md:text-xl">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-600 md:text-base">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section - IMPROVED */}
      <section className="py-12 bg-white md:py-20">
        <div className="container px-4 mx-auto md:px-6">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-2xl font-bold text-gray-800 md:text-4xl">
              Meet Our Team
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 md:text-xl">
              The passionate professionals behind OneTouch Solution's success.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="flex flex-col overflow-hidden transition duration-300 bg-white shadow-lg rounded-xl hover:shadow-xl"
              >
                {/* Improved Image Container */}
                <div className="relative pt-[100%] overflow-hidden bg-gray-100">
                  {" "}
                  {/* Square aspect ratio */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="absolute inset-0 object-cover w-full h-full transition duration-500 hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzljYTNkZCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=";
                    }}
                  />
                </div>
                <div className="flex flex-col flex-1 p-4 md:p-6">
                  <h3 className="mb-1 text-lg font-bold text-gray-800 md:text-xl line-clamp-1">
                    {member.name}
                  </h3>
                  <p className="mb-3 text-sm font-medium text-indigo-600 md:text-base">
                    {member.role}
                  </p>
                  <p className="mb-4 text-xs text-gray-600 md:text-sm line-clamp-3">
                    {member.bio}
                  </p>
                  <div className="flex mt-auto space-x-3">
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        className="text-gray-400 transition duration-300 hover:text-indigo-600"
                        aria-label={`${member.name} LinkedIn`}
                      >
                        <i className="text-sm fab fa-linkedin-in md:text-base"></i>
                      </a>
                    )}
                    {member.social.twitter && (
                      <a
                        href={member.social.twitter}
                        className="text-gray-400 transition duration-300 hover:text-indigo-600"
                        aria-label={`${member.name} Twitter`}
                      >
                        <i className="text-sm fab fa-twitter md:text-base"></i>
                      </a>
                    )}
                    {member.social.github && (
                      <a
                        href={member.social.github}
                        className="text-gray-400 transition duration-300 hover:text-indigo-600"
                        aria-label={`${member.name} GitHub`}
                      >
                        <i className="text-sm fab fa-github md:text-base"></i>
                      </a>
                    )}
                    {member.social.dribbble && (
                      <a
                        href={member.social.dribbble}
                        className="text-gray-400 transition duration-300 hover:text-indigo-600"
                        aria-label={`${member.name} Dribbble`}
                      >
                        <i className="text-sm fab fa-dribbble md:text-base"></i>
                      </a>
                    )}
                    <a
                      href={`mailto:${member.social.email}`}
                      className="text-gray-400 transition duration-300 hover:text-indigo-600"
                      aria-label={`Email ${member.name}`}
                    >
                      <i className="text-sm fas fa-envelope md:text-base"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-12 bg-gray-50 md:py-20">
        <div className="container px-4 mx-auto md:px-6">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-2xl font-bold text-gray-800 md:text-4xl">
              Our Journey
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 md:text-xl">
              Key milestones in our growth and development.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line - Hidden on mobile, visible on medium+ */}
              <div className="absolute hidden w-1 h-full transform -translate-x-1/2 bg-indigo-200 left-1/2 md:block"></div>

              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center mb-8 md:mb-12 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-col`}
                >
                  <div className="w-full mb-4 md:w-1/2 md:mb-0 md:pl-8 md:pr-8">
                    <div
                      className={`bg-white p-4 rounded-xl shadow-lg text-center md:text-left ${
                        index % 2 === 0 ? "md:text-right" : "md:text-left"
                      }`}
                    >
                      <div className="mb-2 text-xl font-bold text-indigo-600 md:text-2xl">
                        {milestone.year}
                      </div>
                      <h3 className="mb-2 text-lg font-bold text-gray-800 md:text-xl">
                        {milestone.event}
                      </h3>
                      <p className="text-sm text-gray-600 md:text-base">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  <div className="relative hidden md:block">
                    <div className="w-4 h-4 bg-indigo-600 border-4 border-white rounded-full shadow-lg"></div>
                  </div>
                  <div className="hidden md:block md:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-12 bg-white md:py-20">
        <div className="container px-4 mx-auto md:px-6">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-2xl font-bold text-gray-800 md:text-4xl">
              Our Technology Stack
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 md:text-xl">
              We work with modern technologies to deliver cutting-edge
              solutions.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-6 md:gap-8">
            {[
              { name: "React", icon: "fab fa-react", color: "text-blue-500" },
              {
                name: "Node.js",
                icon: "fab fa-node-js",
                color: "text-green-500",
              },
              {
                name: "Python",
                icon: "fab fa-python",
                color: "text-yellow-500",
              },
              { name: "AWS", icon: "fab fa-aws", color: "text-orange-500" },
              { name: "Docker", icon: "fab fa-docker", color: "text-blue-400" },
              {
                name: "IoT",
                icon: "fas fa-microchip",
                color: "text-purple-500",
              },
              {
                name: "Git",
                icon: "fab fa-git-alt",
                color: "text-gray-600",
              },
              { name: "Cloud", icon: "fas fa-cloud", color: "text-blue-300" },
              {
                name: "Database",
                icon: "fas fa-database",
                color: "text-blue-600",
              },
              { name: "AI/ML", icon: "fas fa-brain", color: "text-purple-600" },
              {
                name: "Security",
                icon: "fas fa-shield-alt",
                color: "text-green-600",
              },
              { name: "API", icon: "fas fa-code", color: "text-indigo-500" },
            ].map((tech, index) => (
              <div
                key={index}
                className="p-3 text-center transition duration-300 rounded-lg bg-gray-50 hover:bg-white hover:shadow-lg md:p-4"
              >
                <i
                  className={`${tech.icon} ${tech.color} text-2xl mb-2 md:text-3xl md:mb-3`}
                ></i>
                <div className="text-xs font-medium text-gray-800 md:text-sm">
                  {tech.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 gradient-bg md:py-20">
        <div className="container px-4 mx-auto md:px-6">
          <div className="text-center text-white">
            <h2 className="mb-6 text-2xl font-bold md:text-4xl">
              Ready to Work With Us?
            </h2>
            <p className="max-w-2xl mx-auto mb-8 text-lg text-indigo-100 md:text-xl">
              Let's discuss how we can help transform your business with
              innovative technology solutions.
            </p>
            <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => {
                  navigate("/start-project");
                }}
                className="px-6 py-3 text-sm font-semibold text-indigo-600 transition duration-300 bg-white rounded-lg hover:bg-indigo-50 md:px-8 md:py-3 md:text-base"
              >
                Start a Project
              </button>
              <button
                onClick={() => {
                  navigate("/get-quote");
                }}
                className="px-6 py-3 text-sm font-semibold text-white transition duration-300 bg-transparent border-2 border-white rounded-lg hover:bg-white hover:bg-opacity-10 md:px-8 md:py-3 md:text-base"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LearnMoreAboutUs;
