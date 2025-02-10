import React, { useEffect, useState } from 'react'
import '../styles/Profile.css';
import axios from 'axios';
import {getBaseURL} from '../utils/helperFunctions';
import {toast, Toaster} from 'react-hot-toast';
import { Spacer, Button, Stack, Heading, Divider, Input, Textarea, CloseButton } from '@chakra-ui/react';
import {PlusSquareIcon, DeleteIcon} from '@chakra-ui/icons';
import Skill from '../components/Skill';
import Education from '../components/Education';
import Experience from '../components/Experience';
import Project from '../components/Project';
import Blog from '../components/Blog';
import { useNavigate } from 'react-router-dom';
import ImageUpload from '../components/ImageUpload';

export default function Profile() {
    const navigate = useNavigate();

    const [profileData, setProfileData] = useState({});

    const [showSkillPopup, setShowSkillPopup] = useState(false);
    const [showExperiencePopup, setShowExperiencePopup] = useState(false);
    const [showProjectPopup, setShowProjectPopup] = useState(false);
    const [showEducationPopup, setShowEducationPopup] = useState(false);
    const [showBlogPopup, setShowBlogPopup] = useState(false);

    const [newSkill, setNewSkill] = useState({
        skillName : '',
        skillLevel : 0,
    });

    const [newEducation, setNewEducation] = useState({
        course : '',
        institution : '',
        passingYear : '',
        score : ''
    });

    const [newExperience, setNewExperience] = useState({
        post : '',
        organization : '',
        yearJoined : ''
    });

    const [newProject, setNewProject] = useState({
        projectTitle : '',
        description : '',
        projectLink : '',
        imageURL : ''
    });

    const [newBlog, setNewBlog] = useState({
        title : '',
        description : '',
        imageURL : ''
    });

    const closePopups = () =>{
        setShowSkillPopup(false);
        setShowExperiencePopup(false);
        setShowProjectPopup(false);
        setShowEducationPopup(false);
        setShowBlogPopup(false);
    }

    useEffect(()=>{
        const token = sessionStorage.getItem('token');
        axios.get(getBaseURL()+'/profile/get-data', {headers: {
            'Authorization': `Bearer ${token}`
        }})
        .then(res => {
            setProfileData(res.data);
        })
        .catch(err => {
            console.log(err);
            toast.error('Failed to fetch data');
        })
    }, []);

    const updateProfileData = async() =>{
        const token = sessionStorage.getItem('token');
        const toastId = toast.loading('Updating Portfolio')
        axios.put(getBaseURL()+'/profile/update-data', profileData, {headers : {
            'Authorization': `Bearer ${token}`
        }})
        .then(res => {
            if(res.status === 200){
                toast.success(res.data.message, {id: toastId});
            }
        })
        .catch(err => {
            console.log(err);
            toast.error(err.response.data.message, { id : toastId });
        });
    }

    const handleAddSkill = () => {
        setProfileData(prevProfileData => ({
            ...prevProfileData,
            skills: [...prevProfileData.skills, newSkill]
        }));
        setNewSkill({ skillName: '', skillLevel: 0 });
        closePopups();
    };

    const handleAddEducation = () => {
        setProfileData(prevProfileData => ({
            ...prevProfileData,
            education: [...prevProfileData.education, newEducation]
        }));
        setNewEducation({ course: '', institution: '', passingYear: '', score: '' });
        closePopups();
    };

    const handleAddExperience = () => {
        setProfileData(prevProfileData => ({
            ...prevProfileData,
            experience: [...prevProfileData.experience, newExperience]
        }));
        setNewExperience({ post: '', organization: '', yearJoined: '' });
        closePopups();
    };

    const handleAddProject = () => {
        setProfileData(prevProfileData => ({
            ...prevProfileData,
            projects: [...prevProfileData.projects, newProject]
        }));
        setNewProject({ projectTitle: '', description: '', imageURL: '' });
        closePopups();
    };

    const handleAddBlog = () => {
        setProfileData(prevProfileData => ({
            ...prevProfileData,
            blogs: [...prevProfileData.blogs, newBlog]
        }));
        setNewBlog({ title: '', description: '', imageURL: '' });
        closePopups();
    };

    const handleDeleteSkill = (index) => {
        setProfileData(prevProfileData => ({
            ...prevProfileData,
            skills: prevProfileData.skills.filter((_, i) => i !== index)
        }));
    };

    const handleDeleteEducation = (index) => {
        setProfileData(prevProfileData => ({
            ...prevProfileData,
            education: prevProfileData.education.filter((_, i) => i !== index)
        }));
    };
    
    const handleDeleteExperience = (index) => {
        setProfileData(prevProfileData => ({
            ...prevProfileData,
            experience: prevProfileData.experience.filter((_, i) => i !== index)
        }));
    };
    
    const handleDeleteProject = (index) => {
        setProfileData(prevProfileData => ({
            ...prevProfileData,
            projects: prevProfileData.projects.filter((_, i) => i !== index)
        }));
    };
    
    const handleDeleteBlog = (index) => {
        setProfileData(prevProfileData => ({
            ...prevProfileData,
            blogs: prevProfileData.blogs.filter((_, i) => i !== index)
        }));
    };    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({ ...prevData, [name]: value }));
    }

    const logout = () =>{
        sessionStorage.removeItem('token');
        toast.success('User Logged out successfully');
        setTimeout(()=>{
            navigate('/');
        }, 1000); 
    }

    const navigateToPortfolio = () =>{
        navigate(`/portfolio/${profileData.username}`);
    }

    if(!profileData || profileData.length === 0){
        return <div>Loading...</div>;
    }

    return (
        <div className='parent-profile'>
            {/* Navbar */}
            <div className='navbar-profile'>
                <text>SmartFolio</text>
                <Spacer/>
                <Button 
                    onClick={navigateToPortfolio}
                    colorScheme='blue' 
                    borderRadius='8px' 
                    width='110px' 
                    bg='#43BEE5' 
                    _hover={{ color: '#303030' }}
                    alignSelf='center'
                    size={'sm'}
                    margin={'10px'}>
                    View Portfolio
                </Button>
                <Button 
                    onClick={logout}
                    colorScheme='red' 
                    borderRadius='8px' 
                    width='90px' 
                    bg='#ff0000' 
                    _hover={{ color: '#303030' }}
                    alignSelf='center'
                    size={'sm'}
                    margin={'10px'}>
                    Logout
                </Button>
            </div>
            {/* data display */}
            <div className='data-display-profile'>
                <Heading size={'md'} fontWeight={400} color={'#cccccc'}>PROFILE DATA</Heading>
                <Divider/>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', margin: '10px'}}>
                    <div style={{display: 'grid', placeItems: 'center'}}>
                        <img src={profileData.profilePhotoURL} alt='profile-img' className='profile-img'/>
                        <Stack direction={'row'}>
                            <Button
                                onClick={()=>{setProfileData({...profileData, profilePhotoURL : ''})}}
                                borderRadius='8px'
                                colorScheme='red' 
                                size={'sm'}
                                alignSelf='center'
                                _hover={{ color: '#303030' }}
                                bg='#ff0000' 
                                width='50px'
                                height='50px'
                                mr={'10px'}
                            ><DeleteIcon boxSize={6}/></Button>
                            <ImageUpload onUpload={(url)=> {setProfileData({...profileData, profilePhotoURL : url})}} />
                        </Stack>
                    </div>
                    <div className='info-div-profile'>
                        <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                            <text>Username : </text>
                            <Input type='text' variant='unstyled' name='username' value={profileData.username} width={'250px'} ml={'10px'} readOnly maxLength={20} minLength={3}/>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                            <text>Name : </text>
                            <Input type='text' variant='flushed' name='name' value={profileData.name} width={'250px'} ml={'10px'} required onChange={handleChange}/>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                            <text>Gender : </text>
                            <Input type='text' variant='flushed' name='gender' value={profileData.gender} width={'250px'} ml={'10px'} required onChange={handleChange}/>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                            <text>Date of Birth : </text>
                            <Input type='date' variant='flushed' name='dateOfBirth' value={profileData.dateOfBirth} width={'250px'} ml={'10px'} required onChange={handleChange}/>
                        </div>
                    </div>
                </div>

                {/* contacts div */}
                <Heading size={'md'} fontWeight={400} color={'#cccccc'}>CONTACTS</Heading>
                <Divider/>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', margin: '10px'}}>
                    <div className='info-div-profile'>
                        <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                            <text>Phone Number : </text>
                            <Input type='number' variant='flushed' name='phone' value={profileData.phone} width={'250px'} ml={'10px'} required onChange={handleChange}/>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                            <text>LinkedIn : </text>
                            <Input type='text' variant='flushed' name='linkedInURL' value={profileData.linkedInURL} width={'250px'} ml={'10px'} onChange={handleChange}/>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                            <text>GitHub : </text>
                            <Input type='text' variant='flushed' name='githubURL' value={profileData.githubURL} width={'250px'} ml={'10px'} required onChange={handleChange}/>
                        </div>
                    </div>
                    <div className='info-div-profile'>
                        <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                            <text>Address : </text>
                            <Input type='text' variant='flushed' name='address' value={profileData.address} width={'250px'} ml={'10px'} required onChange={handleChange}/>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                            <text>ZIP Code : </text>
                            <Input type='text' variant='flushed' name='zipCode' value={profileData.zipCode} width={'250px'} ml={'10px'} required onChange={handleChange}/>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                            <text>Email : </text>
                            <Input type='email' variant='unstyled' name='email' value={profileData.email} width={'250px'} ml={'10px'} readOnly/>
                        </div>
                    </div>
                </div>

                {/* about div */}
                <Heading size={'md'} fontWeight={400} color={'#cccccc'}>ABOUT</Heading>
                <Divider/>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', margin: '10px'}}>
                    <div className='info-div-profile'>
                        <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                            <text>Tagline : </text>
                            <Input type='text' variant='flushed' name='tagLine' value={profileData.tagLine} width={'250px'} ml={'10px'} required onChange={handleChange}/>
                        </div>
                    </div>
                    <div className='info-div-profile'>
                        <Textarea type='text' name='description' placeholder='Your description' value={profileData.description} maxWidth={'400px'} required onChange={handleChange}/>
                    </div>
                </div>

                {/* skills div */}
                <Heading size={'md'} fontWeight={400} color={'#cccccc'}>SKILLS</Heading>
                <Divider/>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', margin: '10px'}}>
                    {(!profileData || profileData.length === 0 || !profileData.skills) && (
                        <div style={{margin: '10px', color: 'white', fontSize: '16px'}}>No Skills added</div>
                    )}
                    {profileData?.skills?.map((skill, ind)=> {
                        return(
                            <Skill data={skill} key={ind} action={()=> handleDeleteSkill(ind)} />
                        )
                    })}
                    <div onClick={()=>setShowSkillPopup(true)} style={{borderRadius: '8px', height: '80px', minWidth: '260px', maxWidth: '300px', display: 'flex', alignItems: 'center', marginTop: '10px', border: '2px dashed gray'}}>
                        <PlusSquareIcon h={'60px'} w={'60px'} color={'gray'} ml={'7px'}/>
                        <Heading fontWeight={400} ml={'10px'} size={'lg'} color={'gray'}>ADD</Heading>
                    </div>
                </div>

                {/* education div */}
                <Heading size={'md'} fontWeight={400} color={'#cccccc'}>EDUCATION</Heading>
                <Divider/>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', margin: '10px'}}>
                    {(!profileData || profileData.length === 0 || !profileData.education) && (
                        <div style={{margin: '10px', color: 'white', fontSize: '16px'}}>No education details added</div>
                    )}
                    {profileData?.education?.map((edu, ind)=> {
                        return(
                            <Education data={edu} key={ind} action={() => handleDeleteEducation(ind)}/>
                        )
                    })}
                    <div onClick={()=>setShowEducationPopup(true)} style={{borderRadius: '8px', height: '80px', minWidth: '260px', maxWidth: '300px', display: 'flex', alignItems: 'center', marginTop: '10px', border: '2px dashed gray'}}>
                        <PlusSquareIcon h={'60px'} w={'60px'} color={'gray'} ml={'7px'}/>
                        <Heading fontWeight={400} ml={'10px'} size={'lg'} color={'gray'}>ADD</Heading>
                    </div>
                </div>

                {/* experience div */}
                <Heading size={'md'} fontWeight={400} color={'#cccccc'}>EXPERIENCE</Heading>
                <Divider/>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', margin: '10px'}}>
                    {(!profileData || profileData.length === 0 || !profileData.experience) && (
                        <div style={{margin: '10px', color: 'white', fontSize: '16px'}}>No experience added</div>
                    )}
                    {profileData?.experience?.map((exp, ind)=> {
                        return(
                            <Experience data={exp} key={ind} action={() => handleDeleteExperience(ind)}/>
                        )
                    })}
                    <div onClick={()=>setShowExperiencePopup(true)} style={{borderRadius: '8px', height: '80px', minWidth: '260px', maxWidth: '300px', display: 'flex', alignItems: 'center', marginTop: '10px', border: '2px dashed gray'}}>
                        <PlusSquareIcon h={'60px'} w={'60px'} color={'gray'} ml={'7px'}/>
                        <Heading fontWeight={400} ml={'10px'} size={'lg'} color={'gray'}>ADD</Heading>
                    </div>
                </div>

                {/* projects div */}
                <Heading size={'md'} fontWeight={400} color={'#cccccc'}>PROJECTS</Heading>
                <Divider/>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', margin: '10px', gap:'10px'}}>
                    {(!profileData || profileData.length === 0 || !profileData.projects) && (
                        <div style={{margin: '10px', color: 'white', fontSize: '16px'}}>No projects added</div>
                    )}
                    {profileData?.projects?.map((project, ind)=> {
                        return(
                            <Project data={project} key={ind} action={() => handleDeleteProject(ind)}/>
                        )
                    })}
                    <div onClick={()=>setShowProjectPopup(true)} style={{borderRadius: '8px', height: '80px', minWidth: '400px', maxWidth: '500px', display: 'flex', alignItems: 'center', marginTop: '10px', border: '2px dashed gray'}}>
                        <PlusSquareIcon h={'60px'} w={'60px'} color={'gray'} ml={'7px'}/>
                        <Heading fontWeight={400} ml={'10px'} size={'lg'} color={'gray'}>ADD</Heading>
                    </div>
                </div>

                {/* blogs div */}
                <Heading size={'md'} fontWeight={400} color={'#cccccc'}>BLOGS</Heading>
                <Divider/>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', margin: '10px', gap:'10px'}}>
                    {(!profileData || profileData.length === 0 || !profileData.blogs) && (
                        <div style={{margin: '10px', color: 'white', fontSize: '16px'}}>No projects added</div>
                    )}
                    {profileData?.blogs?.map((blog, ind)=> {
                        return(
                            <Blog data={blog} key={ind} action={() => handleDeleteBlog(ind)}/>
                        )
                    })}
                    <div onClick={()=>setShowBlogPopup(true)} style={{borderRadius: '8px', height: '80px', minWidth: '400px', maxWidth: '500px', display: 'flex', alignItems: 'center', marginTop: '10px', border: '2px dashed gray'}}>
                        <PlusSquareIcon h={'60px'} w={'60px'} color={'gray'} ml={'7px'}/>
                        <Heading fontWeight={400} ml={'10px'} size={'lg'} color={'gray'}>ADD</Heading>
                    </div>
                </div>

                {/* final actions */}
                <Button 
                    onClick={navigateToPortfolio}
                    colorScheme='blue' 
                    borderRadius='8px' 
                    width='110px' 
                    bg='#43BEE5' 
                    _hover={{ color: '#303030' }}
                    alignSelf='center'
                    size={'sm'}
                    margin={'10px'}>
                    View Portfolio
                </Button>
                <Button 
                    onClick={updateProfileData}
                    colorScheme='green' 
                    borderRadius='8px' 
                    width='110px' 
                    bg='#2AFF00' 
                    _hover={{ color: '#303030' }}
                    alignSelf='center'
                    size={'sm'}
                    margin={'10px'}>
                    Save Changes
                </Button>
            </div>

            {showSkillPopup && (
                <div style={{height: 'auto', width: '500px', borderRadius: '10px', backgroundColor: '#02222d', position: 'absolute', top: '100px', left: 'calc((100% - 500px)/2)', boxShadow: '0 2px 8px black', padding: '10px', color: 'white'}}>
                    <Stack direction={'row'}>
                        <Heading size={'md'} fontWeight={'md'} color={'white'}>Add Skill</Heading>
                        <Spacer/>
                        <CloseButton bgColor={'red'} size='sm' onClick={closePopups}/>
                    </Stack>
                    <text style={{fontSize: '16px', color: 'gray'}}>Skill name : </text>
                    <Input type='text' variant='flushed' name='skillName' value={newSkill.skillName} width={'250px'} ml={'10px'} onChange={(e) => setNewSkill({ ...newSkill, skillName: e.target.value })}/><br/>
                    <text style={{fontSize: '16px', color: 'gray'}}>Skill name : </text>
                    <Input type='number' variant='flushed' name='skillLevel' value={newSkill.skillLevel} width={'250px'} ml={'10px'} onChange={(e) => setNewSkill({ ...newSkill, skillLevel: Number(e.target.value) })}/><br/>
                    <Button
                        onClick={handleAddSkill}
                        colorScheme='green' 
                        borderRadius='8px' 
                        width='80px' 
                        bg='#2AFF00' 
                        _hover={{ color: '#303030' }}
                        alignSelf='center'
                        size={'sm'}
                        margin={'15px'}>
                        Add
                    </Button>
                </div>
            )}
            {showEducationPopup && (
                <div style={{height: 'auto', width: '500px', borderRadius: '10px', backgroundColor: '#02222d', position: 'absolute', top: '100px', left: 'calc((100% - 500px)/2)', boxShadow: '0 2px 8px black', padding: '10px', color: 'white'}}>
                    <Stack direction={'row'}>
                        <Heading size={'md'} fontWeight={'md'} color={'white'}>Add Education</Heading>
                        <Spacer/>
                        <CloseButton bgColor={'red'} size='sm' onClick={closePopups}/>
                    </Stack>
                    <text style={{fontSize: '16px', color: 'gray'}}>Course : </text>
                    <Input type='text' variant='flushed' name='course' value={newEducation.course} width={'250px'} ml={'10px'} onChange={(e) => setNewEducation({ ...newEducation, course: e.target.value })}/><br/>
                    <text style={{fontSize: '16px', color: 'gray'}}>Institution : </text>
                    <Input type='text' variant='flushed' name='institution' value={newEducation.institution} width={'250px'} ml={'10px'} onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}/><br/>
                    <text style={{fontSize: '16px', color: 'gray'}}>Passing Year : </text>
                    <Input type='text' variant='flushed' name='passingYear' value={newEducation.passingYear} width={'250px'} ml={'10px'} onChange={(e) => setNewEducation({ ...newEducation, passingYear: e.target.value })}/><br/>
                    <text style={{fontSize: '16px', color: 'gray'}}>Score : </text>
                    <Input type='text' variant='flushed' name='score' value={newEducation.score} width={'250px'} ml={'10px'} onChange={(e) => setNewEducation({ ...newEducation, score: e.target.value })}/><br/>
                    <Button
                        onClick={handleAddEducation}
                        colorScheme='green' 
                        borderRadius='8px' 
                        width='80px' 
                        bg='#2AFF00' 
                        _hover={{ color: '#303030' }}
                        alignSelf='center'
                        size={'sm'}
                        margin={'15px'}>
                        Add
                    </Button>
                </div>
            )}
            {showExperiencePopup && (
                <div style={{height: 'auto', width: '500px', borderRadius: '10px', backgroundColor: '#02222d', position: 'absolute', top: '100px', left: 'calc((100% - 500px)/2)', boxShadow: '0 2px 8px black', padding: '10px', color: 'white'}}>
                    <Stack direction={'row'}>
                        <Heading size={'md'} fontWeight={'md'} color={'white'}>Add Experience</Heading>
                        <Spacer/>
                        <CloseButton bgColor={'red'} size='sm' onClick={closePopups}/>
                    </Stack>
                    <text style={{fontSize: '16px', color: 'gray'}}>Post : </text>
                    <Input type='text' variant='flushed' name='post' value={newExperience.post} width={'250px'} ml={'10px'} onChange={(e) => setNewExperience({ ...newExperience, post: e.target.value })}/><br/>
                    <text style={{fontSize: '16px', color: 'gray'}}>Organization : </text>
                    <Input type='text' variant='flushed' name='organization' value={newExperience.organization} width={'250px'} ml={'10px'} onChange={(e) => setNewExperience({ ...newExperience, organization: e.target.value })}/><br/>
                    <text style={{fontSize: '16px', color: 'gray'}}>Year Joined : </text>
                    <Input type='text' variant='flushed' name='yearJoined' value={newExperience.yearJoined} width={'250px'} ml={'10px'} onChange={(e) => setNewExperience({ ...newExperience, yearJoined: e.target.value })}/><br/>
                    <Button
                        onClick={handleAddExperience}
                        colorScheme='green' 
                        borderRadius='8px' 
                        width='80px' 
                        bg='#2AFF00' 
                        _hover={{ color: '#303030' }}
                        alignSelf='center'
                        size={'sm'}
                        margin={'15px'}>
                        Add
                    </Button>
                </div>
            )}
            {showProjectPopup && (
                <div style={{height: 'auto', width: '500px', borderRadius: '10px', backgroundColor: '#02222d', position: 'absolute', top: '100px', left: 'calc((100% - 500px)/2)', boxShadow: '0 2px 8px black', padding: '10px', color: 'white'}}>
                    <Stack direction={'row'}>
                        <Heading size={'md'} fontWeight={'md'} color={'white'}>Add Project</Heading>
                        <Spacer/>
                        <CloseButton bgColor={'red'} size='sm' onClick={closePopups}/>
                    </Stack>
                    <text style={{fontSize: '16px', color: 'gray'}}>Title : </text>
                    <Input type='text' variant='flushed' name='projectTitle' value={newProject.projectTitle} width={'250px'} ml={'10px'} onChange={(e) => setNewProject({ ...newProject, projectTitle: e.target.value })}/><br/>
                    <text style={{fontSize: '16px', color: 'gray'}}>Description : </text>
                    <Textarea type='text' name='description' width={'450px'} value={newProject.description} ml={'10px'} mt={'10px'} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}/><br/>
                    <text style={{fontSize: '16px', color: 'gray'}}>Project Link : </text>
                    <Input type='text' variant='flushed' name='projectLink' value={newProject.projectLink} width={'250px'} ml={'10px'} mb={'10px'} onChange={(e) => setNewProject({ ...newProject, projectLink: e.target.value })}/><br/>
                    <ImageUpload onUpload={(url) => {setNewProject({ ...newProject, imageURL: url })}} /><br/>
                    <Button
                        onClick={handleAddProject}
                        colorScheme='green' 
                        borderRadius='8px' 
                        width='80px' 
                        bg='#2AFF00' 
                        _hover={{ color: '#303030' }}
                        alignSelf='center'
                        size={'sm'}
                        margin={'15px'}>
                        Add
                    </Button>
                </div>
            )}
            {showBlogPopup && (
                <div style={{height: 'auto', width: '500px', borderRadius: '10px', backgroundColor: '#02222d', position: 'absolute', top: '100px', left: 'calc((100% - 500px)/2)', boxShadow: '0 2px 8px black', padding: '10px', color: 'white'}}>
                    <Stack direction={'row'}>
                        <Heading size={'md'} fontWeight={'md'} color={'white'}>Add Blog</Heading>
                        <Spacer/>
                        <CloseButton bgColor={'red'} size='sm' onClick={closePopups}/>
                    </Stack>
                    <text style={{fontSize: '16px', color: 'gray'}}>Title : </text>
                    <Input type='text' variant='flushed' name='title' value={newBlog.title} width={'250px'} ml={'10px'} onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}/><br/>
                    <text style={{fontSize: '16px', color: 'gray'}}>Description : </text>
                    <Textarea type='text' name='description' value={newBlog.description} width={'450px'} ml={'10px'} mt={'10px'} mb={'10px'} onChange={(e) => setNewBlog({ ...newBlog, description: e.target.value })}/><br/>
                    <ImageUpload onUpload={(url) => {setNewBlog({ ...newBlog, imageURL: url })}} /><br/>
                    <Button
                        onClick={handleAddBlog}
                        colorScheme='green' 
                        borderRadius='8px' 
                        width='80px' 
                        bg='#2AFF00' 
                        _hover={{ color: '#303030' }}
                        alignSelf='center'
                        size={'sm'}
                        margin={'15px'}>
                        Add
                    </Button>
                </div>
            )}
            <Toaster/>
        </div>
    );
}
