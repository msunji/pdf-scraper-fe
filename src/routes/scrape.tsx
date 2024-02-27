import Navbar from '../components/Navbar';
import PdfForm from '../components/PdfForm';

function Scrape() {
    return (
        <>
            <Navbar />
            <main className="container">
                <section>
                    <h1>PSE Market Report PDF Scraper</h1>
                    <p>This is a tool for scraping <a href='https://www.pse.com.ph/market-report/'>End of Day Quotes</a> from the PSE website.</p>
                </section>
                <section>
                    <h2>How do I use this?</h2>
                    <ol>
                        <li>
                        Copy the URL/address of the Daily Quote End of Day Report that you want to scrape (e.g. <em>documents.pse.com.ph/market_report/...-EOD.pdf</em>).
                        <ul>
                            <li><span className='highlight'><strong>Note:</strong> This form only takes one PDF URL each time</span></li>
                        </ul>
                        </li>
                        <li>Paste it into the form below.</li>
                        <li>
                        Select either the <strong>"daily"</strong> or <strong>"weekly"</strong> option depending on type of report you need the data for. By default, the form is set to <strong>"daily"</strong>.
                        <ul>
                            <li><b>"daily"</b> - The scraper filters the report for stocks in your portfolio. Data is sent to the <b>"portfolio_eod_mkt_report"</b> sheet on Google Sheets.</li>
                            <li><b>"weekly"</b> - The scraper filters the report for stocks in your weekly gainers/losers report. Data is sent to the <b>"wow_eod_mkt_report"</b> sheet on Google Sheets.</li>
                        </ul>
                        </li>
                        <li>
                        Click on the <strong>"Scrape Now"</strong> button. Data should show up in your target sheet as soon as the script finishes running 🚀
                        <ul>
                            <li><strong>Note:</strong> Sometimes the data doesn't show up right away if you have the sheet open in another window or tab. If this happens, please try going back to Google Sheets and opening the worksheet again.</li>
                        </ul>
                        </li>
                    </ol>
                </section>
                <section>
                    <PdfForm />
                </section>
            </main>
        </>
    )
}

export default Scrape;