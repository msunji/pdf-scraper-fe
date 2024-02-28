/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { 
    useForm, 
    SubmitHandler,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';


const schema = yup
    .object({
        pdfUrl: yup
            .string()
            .required()
            .matches(/\.pdf$/, 'This form only takes PDF files'),
        reportType: yup
            .string()
            .required()     
    })

type FormData = {
    pdfUrl: string
    reportType: string
}

function PdfForm() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        defaultValues: {
            pdfUrl: "",
            reportType: "",
        },
        resolver: yupResolver(schema)
    });
    
    const onSubmit:SubmitHandler<FormData> = async (data:FormData) => {
        console.log(data);
        try {
            const res = await axios.post('http://localhost:5000/api/submit-form', data);
            // console.log(res.data);
        } catch (error) {
            console.error('Form submission error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor='url' className='required-input'>PDF URL/Address<span>*</span></label>
                <input
                    id='url'
                    type='text'
                    {...register('pdfUrl')}
                />
                { errors.pdfUrl?.type === 'required' && (
                    <p className='form-input-error'>A valid PSE Report URL is required (e.g. http://pse.com.ph/.../202023-EOD.pdf)</p>
                )}
            </div>
            <div>
                <fieldset className='radio-container'>
                    <legend className='required-input'><strong>Select a report type</strong></legend>
                    { errors.reportType?.type === 'required' && (
                        <p className='form-input-error'>Please select a report type below</p>
                    )}

                    <div className='radio-container__input'>
                        <input
                            {...register('reportType')}
                            type='radio'
                            value='daily'
                        />
                        <label htmlFor='daily'>
                            <p>Daily</p>
                            <small>Pick this if you need to scrape daily data for stocks in your portfolio</small>
                        </label>
                    </div>
                    <div className='radio-container__input'>
                        <input
                            {...register('reportType')}
                            type='radio'
                            value='weekly'
                        />
                        <label htmlFor='weekly'>
                            <p>Weekly</p>
                            <small>Pick this if you need to scrape week-on-week data for the weekly report. You'll need to put in PDF URLs for two different dates separately.</small>
                        </label>
                    </div>
                </fieldset>
            </div>

            <button className="button" type="submit">Scrape</button>
        </form>
    )
}

export default PdfForm;