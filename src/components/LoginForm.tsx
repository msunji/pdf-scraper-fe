/* eslint-disable @typescript-eslint/consistent-type-definitions */
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

type FormData = {
    email: string
    password: string
}
function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        defaultValues: {
            email: '',
            password: '******',
        },
        resolver: yupResolver(schema)
    });

    const onSubmit:SubmitHandler<FormData> = (data:FormData) => console.log(data);
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
    )
}

export default LoginForm