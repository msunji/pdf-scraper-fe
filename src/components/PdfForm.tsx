import { 
    useForm, 
    SubmitHandler 
} from 'react-hook-form';

interface FormData {
    pdfUrl: string,
    reportType: string
}

function PdfForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<FormData>();
    const onSubmit:SubmitHandler<FormData> = (data) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor='url'>PDF URL/Address<span>*</span></label>
                <input
                    id='url'
                    type='text'
                    defaultValue='pse-report.pdf'
                    {...register('pdfUrl')}
                />
                <fieldset>
                    <legend>Select a report type</legend>
                    <div className="radio-container__input">
                        <input
                            type="radio"
                            value="daily"
                        />
                        <label htmlFor="daily">
                            <p>Daily</p>
                            <small>Pick this if you need to scrape daily data for stocks in your portfolio</small>
                        </label>
                    </div>
                    <div className="radio-container__input">
                        <input
                            type="radio"
                            value="weekly"
                        />
                        <label htmlFor="weekly">
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