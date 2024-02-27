import { useAuth } from '../context/AuthContext';
import { 
    useForm, 
    SubmitHandler,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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
            await login(data.email, data.password)
        } catch (error) {
            console.error(error)
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
                placeholder='your-email@email.com'
                {...register('password')}
            />
            <button type="submit" className="button">Login</button>
            </form>
        </>

    )
}

export default LoginForm