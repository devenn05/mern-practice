import { UserProfile } from './UserProfile';
import userEvent from '@testing-library/user-event';
import {render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom';
import { use } from 'react';
import { glob } from 'fs';

const MOCK_CSV_DATA = `username,id,name
dev11,1,dev
reactninja,3, eve`;

describe('UserProfile Component', ()=>{
    beforeEach(()=>{
        jest.restoreAllMocks;
    });

    test('renders UI correctly', ()=>{
        render(<UserProfile/>)
        expect(screen.getByText('User Profile Finder')).toBeInTheDocument();
        expect(screen.queryByRole('form')).not.toBeInTheDocument();
    });

    test('Click the Button to show and Hide the form', async()=>{
        const user = userEvent.setup();
        render(<UserProfile/>)
        const enableButton = screen.getByRole('button',{ name: /show form/i })
        await user.click(enableButton)
        expect(screen.getByRole('form')).toBeInTheDocument()
        const hideButton = screen.getByRole('button',{ name: /hide form/i })
        await user.click(hideButton)
         expect(screen.queryByRole('form')).not.toBeInTheDocument()
    });

    //We need to make sure the user can type. This tests the internal state of the component
    test('Type the username', async()=>{
        const user = userEvent.setup();
        render(<UserProfile/>)
        const enableButton = screen.getByRole('button',{ name: /show form/i })
        await user.click(enableButton)
        const input = screen.getByPlaceholderText('Enter username...');
        const submitButton = screen.getByRole('button', {name: /fetch user/i})
        expect(submitButton).toBeDisabled();
        await user.type(input, 'devN')
        expect(input).toHaveValue('devN')
        expect(submitButton).toBeEnabled()
    });

    // Mocking the API (CSV) Logic
    test('To find the User and Display it', async()=>{
        const user = userEvent.setup();
        global.fetch = jest.fn(()=>
            Promise.resolve({
                ok: true, 
                text: () => Promise.resolve(MOCK_CSV_DATA),
            })
        ) as jest.Mock

        render(<UserProfile/>)
        const enableButton = screen.getByRole('button',{ name: /show form/i })
        await user.click(enableButton)
        await user.type(screen.getByPlaceholderText('Enter username...'), 'dev11')
        const submitButton = screen.getByRole('button', {name: /fetch user/i})
        await user.click(submitButton)
        await waitFor(()=>{
            expect(screen.getByText('Welcome, dev!'))
        })
        expect(global.fetch).toHaveBeenCalledWith('/users.csv');
    })
})