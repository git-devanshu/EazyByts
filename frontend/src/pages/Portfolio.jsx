import React, { useEffect, useState } from 'react'
import '../styles/Portfolio.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {getBaseURL} from '../utils/helperFunctions';
import {toast, Toaster} from 'react-hot-toast';
import { Spacer, Button, Stack, Heading, Divider, Input, Textarea, CloseButton, Text, Link } from '@chakra-ui/react';
import SectionHeading from '../components/SectionHeading';

// publicly visible in read only mode
export default function Portfolio() {
    const {username} = useParams();

    const [profileData, setProfileData] = useState({});

    const [message, setMessage] = useState({
        name : '',
        email : '',
        messageText : '',
        receiver : username
    });

    useEffect(()=>{
        axios.get(`${getBaseURL()}/profile/get-portfolio/${username}`)
        .then(res => {
            setProfileData(res.data);
        })
        .catch(err => {
            console.log(err);
            toast.error('Failed to fetch data');
        })
    }, []);

    const sendMessage = () =>{
        axios.post(getBaseURL()+'/profile/send-message', message)
        .then(res => {
            if(res.status === 200){
                toast.success(res.data.message);
                setMessage({name : '', email : '', messageText : '', receiver : username});
            }
        })
        .catch(err => {
            console.log(err);
            toast.error(err.response.data.message);
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMessage({ ...message, [name]: value });
    }

    return (
        <div className='parent-portfolio'>
            {/* navbar */}
            <div className='navbar-profile'>
                <text>SmartFolio</text>
                <Spacer/>
                
            </div>

            {/* hero section */}
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
                <div className='title-div'>
                    <div>
                        <Heading size='3xl' color='#43BEE5'>Hey! I'm {profileData.name}</Heading><br/>
                        <Heading size='lg' fontWeight={500} color={'white'}>{profileData.tagLine}</Heading>
                    </div>
                </div>
                <div className='profile-img-div'>
                    <img src={profileData.profilePhotoURL} alt='profile-img'/>
                </div>
            </div>

            {/* About section */}
            <SectionHeading heading='About Me' backgroundTitle='ABOUT'/>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
                <div className='title-div'>
                    <div style={{padding: '10px'}}>
                        <text style={{color : 'gray'}}>Name : </text>
                        <text style={{color : 'white'}}>{profileData.name}</text><br/>
                        <text style={{color : 'gray'}}>Date of Birth : </text>
                        <text style={{color : 'white'}}>{profileData.dateOfBirth}</text><br/>
                        <text style={{color : 'gray'}}>Address : </text>
                        <text style={{color : 'white'}}>{profileData.address}</text><br/>
                        <text style={{color : 'gray'}}>ZIP Code : </text>
                        <text style={{color : 'white'}}>{profileData.zipCode}</text><br/>
                        <text style={{color : 'gray'}}>Gender : </text>
                        <text style={{color : 'white'}}>{profileData.gender}</text>
                    </div>
                </div>
                <div style={{width: '100%', padding: '20px', display: 'flex', justifyContent: 'center'}}>
                    <div style={{padding: '10px'}}>
                        <Text color={'gray'}>Description</Text>
                        <Text color={'white'}>{profileData.description}</Text>
                    </div>
                </div>
            </div>

            {/* Education section */}
            <SectionHeading heading='My Education' backgroundTitle='EDUCATION'/>
            {(!profileData || !profileData.education || profileData.education.length === 0) && (
                <div style={{display: 'grid', placeItems: 'center', marginBottom: '30px'}}>
                    <Heading size='md' fontWeight={400} color={'white'}>No Education Details Added</Heading>
                </div>
            )}
            <div className='skills-list'>
                {profileData?.education?.map((edu, ind)=> {
                    return(
                        <div style={{backgroundColor: '#02222d', minHeight: '200px', borderRadius: '10px', width: '100%', padding: '20px'}}>
                            <Heading size='md' color='#43BEE5' fontWeight={500}>{edu.course}</Heading>
                            <Text color={'gray'}>Institution</Text>
                            <Heading size='md' color='white' fontWeight={400}>{edu.institution}</Heading><br/>
                            <text style={{color : 'gray'}}>Passing year : </text>
                            <text style={{color : 'white'}}>{edu.passingYear}</text><br/>
                            <text style={{color : 'gray'}}>Score : </text>
                            <text style={{color : 'white'}}>{edu.score}</text><br/>
                        </div>
                    );
                })}
            </div>

            {/* Skills section */}
            <SectionHeading heading='My Skills' backgroundTitle='SKILLS'/>
            {(!profileData || !profileData.skills || profileData.skills.length === 0) && (
                <div style={{display: 'grid', placeItems: 'center', marginBottom: '30px'}}>
                    <Heading size='md' fontWeight={400} color={'white'}>No Skills Added</Heading>
                </div>
            )}
            <div className='skills-list'>
                {profileData?.skills?.map((skill, ind)=> {
                    return(
                        <div class="skill">
                            <p>{skill.skillName}</p>
                            <div class="skill-bar">
                                <div style={{width: `${skill.skillLevel}%`}}></div>
                            </div>
                        </div>
                    );
                })}
            </div>  

            {/* Experience section */}
            <SectionHeading heading='My Experience' backgroundTitle='EXPERiENCE'/>
            {(!profileData || !profileData.experience || profileData.experience.length === 0) && (
                <div style={{display: 'grid', placeItems: 'center', marginBottom: '30px'}}>
                    <Heading size='md' fontWeight={400} color={'white'}>No Experience Details Added</Heading>
                </div>
            )}
            <div className='skills-list'>
                {profileData?.experience?.map((exp, ind)=> {
                    return(
                        <div style={{backgroundColor: '#02222d', minHeight: '150px', borderRadius: '10px', width: '100%', padding: '20px'}}>
                            <Heading size='md' color='#43BEE5' fontWeight={500}>{exp.organization}</Heading>
                            <Text color={'gray'}>Post</Text>
                            <Heading size='md' color='white' fontWeight={400}>{exp.post}</Heading><br/>
                            <text style={{color : 'gray'}}>Year Joined : </text>
                            <text style={{color : 'white'}}>{exp.yearJoined}</text>
                        </div>
                    );
                })}
            </div>

            {/* Projects section */}
            <SectionHeading heading='My Projects' backgroundTitle='PROJECTS'/>
            {(!profileData || !profileData.projects || profileData.projects.length === 0) && (
                <div style={{display: 'grid', placeItems: 'center', marginBottom: '30px'}}>
                    <Heading size='md' fontWeight={400} color={'white'}>No Projects Added</Heading>
                </div>
            )}
            <div className='project-list'>
                {profileData?.projects?.map((project, ind)=> {
                    return(
                        <div style={{backgroundColor: '#02222d', minHeight: '250px', borderRadius: '10px', width: '100%', padding: '20px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '20px'}}>
                            <div>
                                <Heading size='md' color='#43BEE5' fontWeight={500}>{project.projectTitle}</Heading>
                                <Text style={{color : 'gray'}}>Description</Text>
                                <Text style={{color : 'white'}}>{project.description}</Text>
                                <text style={{color : 'gray'}}>Link : </text>
                                <Link color='gray' href={project.projectLink}>{project.projectLink}</Link>
                            </div>
                            <div>
                                <img src={project.imageURL} style={{height: '200px', width: '100%'}}/>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Blogs section */}
            <SectionHeading heading='My Blogs' backgroundTitle='BLOGS'/>
            {(!profileData || !profileData.blogs || profileData.blogs.length === 0) && (
                <div style={{display: 'grid', placeItems: 'center', marginBottom: '30px'}}>
                    <Heading size='md' fontWeight={400} color={'white'}>No Blogs Added</Heading>
                </div>
            )}
            <div className='skills-list'>
                {profileData?.blogs?.map((blog, ind)=> {
                    return(
                        <div style={{backgroundColor: '#02222d', minHeight: '300px', borderRadius: '10px', width: '100%', padding: '20px'}}>
                            <img src={blog.imageURL} style={{minWidth: '300px', minHeight: '200px', margin: '0 auto', marginBottom: '15px'}}/>
                            <Heading size='md' color='#43BEE5' fontWeight={500}>{blog.title}</Heading>
                            <Text style={{color : 'white'}}>{blog.description}</Text>
                        </div>
                    );
                })}
            </div>

            {/* Contacts section */}
            <SectionHeading heading='Contact Me' backgroundTitle='CONTACTS'/>
            <section className="contact">
                <div className="info">
                    <div>
                        <img src="https://img.icons8.com/ios-filled/50/email.png" alt="Email"/>
                        <a>{profileData.email}</a>
                    </div>
                    <div>
                        <img src="https://img.icons8.com/ios-filled/50/phone.png" alt="Phone"/>
                        <a>{profileData.phone}</a>
                    </div>
                    <div>
                        <img src="https://img.icons8.com/ios-filled/50/github.png" alt="Address"/>
                        <a>{profileData.githubURL}</a>
                    </div>
                    <div>
                        <img src="https://img.icons8.com/ios-filled/50/linkedin.png" alt="Address"/>
                        <a>{profileData.linkedInURL}</a>
                    </div>
                </div>
                <form>
                    <Text color='white' fontSize='3xl' mb='20px'>Send a Message</Text>
                    <div className="form-group">
                        <input type="text" id="name" name="name" value={message.name} onChange={handleChange} placeholder="Your Name"/>
                    </div>
                    <div className="form-group">
                        <input type="email" id="email" name="email" value={message.email} onChange={handleChange} placeholder="Your Email"/>
                    </div>
                    <div className="form-group">
                        <textarea id="message" name="messageText" value={message.messageText} onChange={handleChange} placeholder="Your Message"/>
                    </div>
                    <Button
                        onClick={sendMessage}
                        colorScheme='blue' 
                        borderRadius='8px' 
                        width='130px' 
                        bg='#43BEE5' 
                        _hover={{ color: '#303030' }}
                        alignSelf='center'
                        margin={'10px'}>
                        Send Message
                    </Button>
                </form>
            </section>

            {/* Footer */}
            <div style={{width: '100%', height: '50px', backgroundColor: '#02222d', display: 'grid', placeItems: 'center'}}>
                <Text color='white'>Thankyou for Visiting...</Text>
            </div>
        <Toaster/>
        </div>
    );
}
