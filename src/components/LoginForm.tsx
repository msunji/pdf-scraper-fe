import { useAuth } from '../context/AuthContext';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FirebaseError } from 'firebase/app';

const schema = yup
    .object({
        email: yup
            .string()
            .required(),
        password: yup
            .string()
            .required()
    })

interface FormData {
    email: string
    password: string
}

function LoginForm() {
    const { login } = useAuth();
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
            { errors.email?.type === 'auth-error' && (
                    <p className='form-input-error'>Invalid login credentials</p>
            )}
            <button type="submit" className="button">Login</button>
            </form>
        </>

    )
}

export default LoginForm