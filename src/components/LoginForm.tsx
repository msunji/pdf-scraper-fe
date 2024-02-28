import { useAuth } from '../context/AuthContext';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FirebaseError } from 'firebase/app';
import { useLocation, useNavigate } from 'react-router-dom';

const schema = yup
    .object({
        email: yup
            .string()
            .required('Please enter a valid email address'),
        password: yup
            .string()
            .required('Please enter a valid password')
    })

interface FormData {
    email: string
    password: string
}

interface Location {
    pathname: string;
    search: string;
    hash: string;
    state: unknown;
    key: string;
}

interface LocationProps {
    state: {
        from: Location
    }
}

function LoginForm() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation() as unknown as LocationProps;


    const from = location.state?.from?.pathname || "/";

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<FormData>({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(schema)
    });

    const onLogin:SubmitHandler<FormData> = async (data:FormData) => {
        try {
            await login(data.email, data.password);
            navigate(from, {
                replace: true
            })
        } catch (e) {
            const error = e instanceof FirebaseError;
            console.log(error);
            if (error && e.code === 'auth/invalid-credential') {
                setError('email', {
                    type: 'auth-error',
                    message: 'Invalid login credentials'
                });
                setError('password', {
                    type: 'auth-error',
                    message: 'Invalid login credentials'
                }); 
            }
        }
    };


    return (
        <>
            <form onSubmit={handleSubmit(onLogin)}>
            <label>Email</label>
            <input
                id='email'
                type='text'
                placeholder="your-email@email.com"
                {...register('email')}
            />
            <label>Password</label>
            <input
                id='password'
                type='password'
                placeholder='******'
                {...register('password')}
            />
            { (errors.email ?? errors.password) && (
                    <p className='form-input-error'>{ errors.email?.message ?? errors.password?.message }</p>
            )}
            <button type="submit" className="button">Login</button>
            </form>
        </>

    )
}

export default LoginForm