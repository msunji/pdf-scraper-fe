/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { 
    useForm, 
    SubmitHandler,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
    .object({
        pdfUrl: yup
            .string()
            .required(),
        reportType: yup
            .string()
            .required()
            .matches(/(\.|\/)(pdf)/, 'This form only accepts PDF files')
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
    
    const onSubmit:SubmitHandler<FormData> = (data:FormData) => console.log(data, errors);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor='url'>PDF URL/Address<span>*</span></label>
                <input
                    id='url'
                    type='text'
                    {...register('pdfUrl')}
                />
                { errors.pdfUrl?.type === 'required' && (
                    <p>A valid PSE Report URL is required</p>
                )}
                { errors.reportType?.type === 'matches' && (
                    <p>Please input a valid PDF file (e.g. http://pse.com.ph/.../202023-EOD.pdf)</p>
                ) }
            </div>
            <div>
                <fieldset>
                    <legend>Select a report type</legend>
                    { errors.reportType?.type === 'required' && (
                        <p>A valid PSE Report URL is required</p>
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

            <input type="submit" />
        </form>
    )
}

export default PdfForm;