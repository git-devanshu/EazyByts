import React from 'react';
import {Heading, Spacer, Button} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import '../styles/Profile.css';

export default function Blog({data, action}) {
    return (
        <div className='project-card'>
            <div className='project-card-desc-div'>
                <text style={{fontSize: '14px', color: 'gray', fontWeight: '400'}}>Title</text>
                <Heading size={'sm'} color={'white'} fontWeight={400}>{data.title}</Heading>
                <text style={{fontSize: '14px', color: 'gray', fontWeight: '400'}}>Description</text>
                <Heading size={'sm'} color={'white'} fontWeight={400}>{data.description}</Heading>
            </div>
            <Spacer/>
            <div>
                <img src={data.imageURL}/>
                <Button leftIcon={<DeleteIcon/>} onClick={action} ml={'10px'} bgColor={'red'} colorScheme='red'>Delete</Button>
            </div>
        </div>
    );
}