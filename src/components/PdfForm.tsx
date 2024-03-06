import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
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

interface FormData {
    pdfUrl: string
    reportType: string
}

function PdfForm() {
    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors, isSubmitting, isSubmitSuccessful }
    } = useForm<FormData>({
        defaultValues: {
            pdfUrl: '',
            reportType: '',
        },
        resolver: yupResolver(schema)
    });

    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    const onSubmit:SubmitHandler<FormData> = async (data:FormData) => {
        try {
            await axios.post(`${import.meta.env.VITE_PYTHONANYWHERE_WEB_APP}/api/submit-form`, data);
            setSuccessMsg('PDF scraped successfully')
        } catch (error:unknown) {
            setError('root.random', {
                type: 'random',
                message: 'Form submission failed. Please retry or ask for assistance.'
            })
            setError('root.serverError', {
                type: '500',
                message: 'There seems to be an issue with the server. Please retry or ask for assistance.'
            })
        }
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset()
            setTimeout(() => {
                setSuccessMsg(null)
            }, 3500)
        }
    }, [isSubmitSuccessful, reset])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor='url' className='required-input'>PDF URL/Address<span>*</span></label>
                <input
                    id='url'
                    type='text'
                    placeholder='example-report.pdf'
                    {...register('pdfUrl')}
                />
                { errors.pdfUrl?.type === 'required' || errors.pdfUrl?.type === 'matches' && (
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
            <div className="pdf-form-submit-container">
                <button className='button' type='submit' disabled={isSubmitting}>
                    { isSubmitting ? 'Scraping' : 'Scrape'}
                </button>
                { successMsg && (<p className="pdf-form-submit-container__success">
                    Data was scraped successfully
                </p>)}
                { errors.root && (<p className="pdf-form-submit-container__error">
                    { errors.root?.random?.message }
                </p>) }
            </div>
        </form>
    )
}

export default PdfForm;