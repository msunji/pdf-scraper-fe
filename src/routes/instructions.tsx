function Instructions() {
    return (
        <>
            <section>
                <h1>Instructions and FAQs</h1>
                <ol className="faqs-container">
                    <li className="faqs-container__question">
                        <p>How many PDFs can I scrape at a time?</p>
                        <p>You can only scrape one at a time.</p>
                    </li>
                    <li className="faqs-container__question">
                        <p>Where can I access the data?</p>
                        <p>Data that you scrape through this web app is automatically sent to the <strong>PH Equity Data</strong> spreadsheet on Google Sheets. You can access the scraped data on these sheets: <strong>Daily PSE End of Day</strong> (daily reports) and <strong>WoW Report Data</strong> (weekly winners/losers report)</p>
                    </li>                   
                    <li className="faqs-container__question">
                        <p>What's the difference between <strong>daily</strong> and <strong>weekly</strong> report types?</p>
                        <p>Selecting the <strong>daily</strong> report type means that the scraper will scrape and filter data to only include stocks in your current portfolio. The <strong>weekly</strong> report type filters data to only include stocks in your weekly winners/losers report.</p>
                    </li>
                    <li className="faqs-container__question">
                        <p>Where can I find the list of stocks in my portfolio? What about the list of stocks in our weekly winners/losers report?</p>
                        <p>To see which stocks are included in your portfolio (for the daily report), please refer to the <strong>stocks</strong> sheet. For the stocks included in your weekly report, please see the <strong>wow_report_stocks</strong> sheet</p>
                    </li>
                    <li className="faqs-container__question">
                        <p>How do I scrape data for the weekly winners/losers report?</p>
                        <p>When have your dates, please look for the reports for those dates on the <a href="https://www.pse.com.ph/market-report/">PSE Market Reports</a> website. You'll need the URLs/addresses for two reports (start date and end date) as you'll be scraping two PDFs to get the data for two dates. Scrape each PDF one at a time and then check the scraped data on Google Sheets afterwards.</p>
                    </li>
                    <li className="faqs-container__question">
                        <p>How do I change the stocks in our portfolio? What about the stocks in our weekly winners/losers report?</p>
                        <p>You can change the selection of stocks directly on Google Sheets, but please make sure to keep stock codes in one column (Column A) and the stock type/market cap size in another column (Column B).</p>
                    </li>
                </ol>
            </section>
        </>
    )
}

export default Instructions;