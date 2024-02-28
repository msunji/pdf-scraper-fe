import { useAuth } from '../context/AuthContext';
import PdfForm from '../components/PdfForm';
import { Link } from 'react-router-dom';

function Scrape() {
    const { currentUserSession } = useAuth();
    return (
        <>
            <section>
                { currentUserSession ? (
                    <h3 className="logged-in-msg">Currently logged in as {currentUserSession.email}</h3>
                    ) : (
                        <h3 className="logged-in-msg">Oops, you're not logged in.</h3>
                    )}
                <h1>PSE Market Report PDF Scraper</h1>
                <p>This is a tool for scraping <a href='https://www.pse.com.ph/market-report/'>End of Day Quotes</a> from the PSE website.</p>
            </section>
            <section>
                <h2>Quick Instructions</h2>
                <ol>
                    <li>Copy the URL/address of the <strong>Daily Quote End of Day Report</strong> that you want to scrape.</li>
                    <li>Paste it into the form below. <span className="highlight">Please only paste <strong>one</strong> url at a time.</span></li>
                    <li>Select a report type (<strong>daily</strong> for daily data, or <strong>weekly</strong> for week-on-week reports).</li>
                    <li>Click on <strong>Scrape</strong> button.</li>
                </ol>
                <p>For further instructions, please see the <Link to='instructions'>Instructions page</Link></p>
            </section>
            <section>
                <PdfForm />
            </section>
        </>
    )
}

export default Scrape;