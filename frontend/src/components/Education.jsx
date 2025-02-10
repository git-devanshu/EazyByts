import React from 'react'
import {Heading, Spacer} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

export default function Education({data, action}) {
    return (
        <div style={{borderRadius: '8px', backgroundColor: '#02222d', minHeight: '180px', minWidth: '260px', maxWidth: '300px', display: 'flex', justifyContent: 'left', marginTop: '10px', paddingLeft: '10px'}}>
            <div style={{maxWidth: '200px'}}>
                <text style={{fontSize: '14px', color: 'gray', fontWeight: '400'}}>Course</text>
                <Heading size={'sm'} color={'white'} fontWeight={400}>{data.course}</Heading>
                <text style={{fontSize: '14px', color: 'gray', fontWeight: '400'}}>Institute</text>
                <Heading size={'sm'} color={'white'} fontWeight={400}>{data.institution}</Heading>
                <text style={{fontSize: '14px', color: 'gray', fontWeight: '400'}}>Passing Year</text>
                <Heading size={'sm'} color={'white'} fontWeight={400}>{data.passingYear}</Heading>
                <text style={{fontSize: '14px', color: 'gray', fontWeight: '400'}}>Score</text>
                <Heading size={'sm'} color={'white'} fontWeight={400}>{data.score}</Heading>
            </div>
            <Spacer/>
            <div onClick={action} style={{margin: '10px', backgroundColor: 'red', height: '40px', width:'40px', borderRadius: '20px', display: 'grid', placeItems: 'center'}}>
                <DeleteIcon boxSize={6}/>
            </div>
        </div>
    );
}
