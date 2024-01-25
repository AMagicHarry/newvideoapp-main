import { Button, Modal } from "react-bootstrap";

interface Props {
  show:boolean;
  handleClose:any;
  handleStatus?: (value: boolean) => void;
}

const PrivacyTerms = ({ show, handleClose, handleStatus }:Props ) => {
  // style={{ borderRadius: 23, minWidth: 520, height: 490 }}

  const onHandleClose = () =>{

    handleClose();
    if (handleStatus)
    handleStatus(false)
  }

  const onHandleAccept = () =>{

    handleClose();
    if (handleStatus)
    handleStatus(true)
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      contentClassName="border-radius-23"
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title id="contained-modal-title-vcenter" className="w-100">
          <h1 style={{ fontSize: 16, margin: '15px 0', fontWeight: 700, textAlign: 'center' }}>Privacy and Terms</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontSize: 12, fontWeight: 400, overflowY: 'auto', maxHeight: 490, margin: 0 }} className="px-4">
        THESE TERMS AND CONDITIONS, together with the “Statement of Work”, “Proposal”, “Work Order” or “Purchase Order” (or similarly titled document) signed with the Customer (as defined below) which is incorporated hereto by reference (in each case, the “SOW”, and collectively – the “Agreement”), are entered hereto and shall constitute a binding agreement by and between the applicable VideoInteriews entity signed on the SOW – either VideoInterviews UK Ltd. or VideoInterviews Ltd. (such entity, the “Company”) – and the counterparty executing the SOW (“Customer”) (Company and Customer may each be also referred to herein as “Party”, and collectively as the “Parties”), as of the services start date stated in the SOW (the “Effective Date”).
        <br /><br />
        For avoidance of doubt, these Terms and Conditions shall apply to and bind, any and all Customers who: (i) have purchased a subscription to the Company’s Platform and Services (as defined below) through the Company’s website (the “Site”) (and not by way of an SOW), or (ii) are receiving the Services and access to the Platform (as defined below) pursuant to an agreement between such Customer and an authorized reseller or distributor acting on behalf of the Company.
        <br /><br />
        * Modifications to these Terms and Conditions
        <br /><br />
        Customer understands that Company may alter, amend, change, waive, terminate or modify any term contained within these Terms and Conditions at any time. Should Company alter, amend, change, waive, terminate or modify any term contained within these Terms and Conditions, it shall provide notice by:
        <br /><br />
        Posting the new Terms and Conditions to the Site;
        Sending electronic mail to the email address Customer provided when creating its account (where available and applicable) or other means pursuant to these Terms and Conditions; and/or
        As otherwise required by law.
        <br /><br />
        If Company informs Customer that the Terms and Conditions have been modified, Customer may elect to terminate use of any of the Services subject to these Terms and Conditions.
        If Customer continues to use any of the Services after receiving notice that these Terms and Conditions have been modified, any continued use shall constitute acceptance of the modified Terms and Conditions and be subject to them.
        Company may ask that Customer acknowledge its agreement to any modified Terms and Conditions. However, even if Company does not do so, Customer’s continued use of Services will be subject to the modified terms.
        Customer agrees to review these Terms and Conditions and the incorporated documents periodically to be updated of any such changes.
        <br /><br />
        Posting the new Terms and Conditions to the Site;
        Sending electronic mail to the email address Customer provided when creating its account (where available and applicable) or other means pursuant to these Terms and Conditions; and/or
        As otherwise required by law.
        <br /><br />
        The Services
        <br />
        Subject to Customer’s compliance with its obligations under this Agreement, Company will provide Customer access to Company’s video interviewing platform (the “Platform”) and related services as set forth in the SOW executed by and between the Parties, for the applicable subscription period set forth in the SOW or the Site, as applicable (collectively – the “Service(s)”).Company hereby grants to Customer a worldwide, nonexclusive, non-transferable, non-sublicensable, royalty-free, limited license during the applicable subscription period to access and use, and to allow its Personnel (as defined below) to access and use the Services and the Platform. With respect to any software that is distributed or provided to Customer for use on Customer premises or devices (if any), Company hereby grants Customer a non-exclusive, non-transferable, non-sublicensable license to use such Software during the subscription period only in connection with the Services.
        Additional Services. The Parties may execute additional SOWs for additional or different features of the Services, and such additional SOWs shall be incorporated and attached hereto. Any agreements between the Parties with respect to availability of the Services, service levels, response times and support, if any, shall be included in the SOW.
        Customer will be required to provide a password and login name in order to access and make use of the Services, including for the purpose of publishing, broadcasting or displaying Content (as defined below) on the Platform. It is Customer’s sole responsibility to maintain the confidentiality of Customer’s password and login details and Customer must notify Company in writing immediately if Customer becomes aware of any unauthorized use of Customer’s password and/or login details. Customer will be regarded as responsible for any Content or any activity that is displayed, is accessible, or occurs under Customer’s login name.
        Customer shall ensure that any Customer Data (as defined below) is provided in proper format as specified by the relevant documentation provided by Company with respect to the applicable SOW and Service.
        <br /><br />
        Cancellation and Termination<br />
        Customer may cancel its account at any time. Before doing so, Company recommends that Customer review these Terms and Conditions carefully so Customer understands what will occur upon cancellation, particularly in relation to payments for Services.
        To effectively cancel Customer’s Account, Customer is required to contact the Company at @VideoInterviews.io for assistance. Upon doing so, the cancellation of Customer’s Account will take place promptly.
        Upon cancellation, all Customer Content may be deleted permanently. Company shall not be responsible for the loss of any such Content due to the cancellation (or termination) of a Company account.
        <br /><br />
        Termination of Account.<br />
        Company reserves the right to refuse its Services to anyone should it believe that the Services have been abused. Should Company believe that the Services have been, will be, or are being used for any unlawful purpose and/or used in violation of any of these Terms and Conditions or any other Company agreement or policy, Company may (a) terminate an account immediately; (b) refuse its Services to anyone; and/or (c) take any further action as permitted by law.
        Company also reserves the right to suspend or terminate a Customer’s account should Company become involved in pending litigation or other similar dispute with a Customer in relation to such account, or for any other reason. Should a Customer become involved in litigation or other similar dispute in relation to an account, Company also may suspend or terminate such account immediately and without notice. Should Company become aware of litigation relating to an account, Company reserves the right to preserve content associated with such account.
        <br /><br />
        Consequences of Termination<br />
        Should Customer’s account be terminated, Company may, in its sole discretion and without liability to Customer, remove and discard any information associated with Customer’s account including, but not limited to, any Content or Customer Content. Should Customer’s Account become terminated, Customer will remain solely responsible for all liabilities that may have arisen or arise from Customer’s account and/or its termination.
        Any Customer whose account has been terminated by Company may not access the Services without the prior express written permission of Company.
        There shall be no refunds for any use of Services terminated because of a breach of these Terms and Conditions.
        Company may also refuse registration, terminate an account and/or refuse Services to a Customer who registers or attempts to register an account with Company without authorization after having had an account previously suspended or terminated by Company.
        Should the Services become terminated globally for any reason, all accounts shall be terminated immediately, without any prior notifications by Company.
        <br /><br />
        Restrictions and Responsibilities<br />
        Customer will not, directly or indirectly: reverse engineer, decompile, disassemble or otherwise attempt to discover the source code, object code or underlying structure, ideas, know-how or algorithms relevant to the Platform and/or the Services or any software, documentation or data related thereto; modify, translate or create derivative works based on the Services and/or the Platform; use the Platform and/or the Services for timesharing or service bureau purposes or otherwise for the benefit of a third party; or remove any proprietary notices or labels therefrom.
        Further, Customer may not remove or export from the or allow the export or re-export of the Services, Platform or anything related thereto, or any direct product thereof in violation of any applicable restrictions, laws, or regulations.
        Customer shall be responsible for obtaining and maintaining any equipment and ancillary services needed to connect to, access or otherwise use the Platform and the Services, including, without limitation, modems, hardware, servers, software, operating systems, networking, web servers and the like (collectively, “Equipment”). Customer shall also be responsible for maintaining the security of the Equipment, Customer account, User IDs, passwords (including but not limited to administrative and user passwords) and files.
        <br /><br />
        Responsibility for Content.<br />
        Customer agrees that Company may review, modify, reformat, monitor, reject or remove texts, messages, illustrations, photos, as well as any audio or video materials (and any combination of these or other materials) (“Content”) that Customer uploads, transmits, posts or otherwise makes available or accessible via the Platform, if Company considers that it, in Company’s sole judgement, violates these Terms and Conditions or may be offensive, illegal or violate the rights, or harm, or threaten the safety of others.Further, Customer is and shall be solely responsible for the Content that Customer uploads, transmits, posts, publishes or displays or otherwise makes available or accessible via the Platform or transmits to or shares with others. Company also agrees to ensure that no Content is deliberately misleading, inaccurate, false or deceptive.
        <br /><br />
        The following is a partial list of the kind of Content that is illegal or prohibited on the Platform (“Prohibited Content”) and Customer reserves the right to investigate and take appropriate legal action against anyone who violates this provision, including removing the offending communication or Content from the Platform. Prohibited Content includes Content that:<br />
        ▪	is patently offensive and promotes racism, bigotry, hatred or physical harm of any kind against any group or individual; or<br />
        ▪	harasses or advocates harassment of another person; or<br />
        ▪	involves the transmission of “junk mail”, “chain letters”, or unsolicited mass mailing or “spamming”; or<br />
        ▪	impersonates any person or entity; or<br />
        ▪	Customer knows or suspect (on reasonable grounds) to be fake, misleading or deceptive; or<br />
        ▪	poses or creates a privacy or security risk to anyone; or<br />
        ▪	promotes information Customer knows is false or misleading or promotes illegal activities or conduct that is abusive, threatening, obscene, defamatory or libellous; or<br />
        ▪	promotes an illegal or unauthorized copy or use of another person’s copyrighted work; or<br />
        ▪	provides instructional information about illegal activities; or<br />
        ▪	solicits passwords or personal identifying information for commercial or unlawful purposes from other users; or<br />
        ▪	contains viruses, or other computer codes or files or programmes designed to interrupt, limit or destroy the functionality of other computer hardware or software; or<br />
        ▪	includes an image or personal information of another person or persons unless Customer has received their consent.<br />
        <br /><br />
        Proprietary Rights; Privacy<br />
        Customer acknowledges that Company owns the Services, including all Content. This Agreement does not confer to Customer any right of ownership in the Content or Services. Customer acknowledges that subject to Section 5.3, the Services and the Content (excluding Customer Data, as defined below) are proprietary in nature and owned exclusively by Company.Customer acknowledges that Company owns the Services, including all Content. This Agreement does not confer to Customer any right of ownership in the Content or Services. Customer acknowledges that subject to Section 5.3, the Services and the Content (excluding Customer Data, as defined below) are proprietary in nature and owned exclusively by Company.
        <br /><br />
        Feedback<br />
        In the event Customer provides Company with any suggestions, comments or other feedback (“Feedback”) relating to the Services or the Platform, such Feedback shall become the sole and exclusive property of Company, and Customer hereby irrevocably assigns to Company all of its right, title and interest in and to such Feedback.
        <br /><br />
        Ownership of Customer Data<br />
        As part of the Services, Customer and its Personnel may provide certain personal data about Customer's personnel or employees, or potential candidates through their use of the Services and the Platform (collectively, “Personal Data”). All Data that is either provided by Customer (including any Personnel and Customer’s employees) through or pursuant to the use of the Services and the Platform, or collected by Company through the Platform, and which is proprietary to Customer (“Customer Data”), will remain the property of Customer (or the candidate, as applicable). The above notwithstanding, Company shall have the right to process and analyze the Personal Data and other information relating to the provision, use and performance of various aspects of the Services and the Platform (including, without limitation, information concerning Customer Data and data derived therefrom), and Company will be free (during and after the Term) to use such information and data to improve and enhance the Services and the Platform and for other development, diagnostic and corrective purposes in connection with the Services and other Company offerings.
        <br /><br />
        Customer’s Privacy Policy<br />
        Customer warrants and represents that it has the full right and authority to permit Company and its third party service providers to process and use the Personal Data for the purposes set forth under this Agreement and in the Company's privacy policy at https://www.videointerviews.io/privacy-policy, and that the processing and use of Personal Data as contemplated under this Agreement by Company and/or Company’s service providers will not violate any applicable law, regulation or rules (including any privacy protection or employment laws) or breach any contractual agreement to which Customer is a party to. Customer further warrants and represents that it has obtained the necessary consents and permissions from its Personnel, employees and other end-users of Customer’s System (“End Users”), including without limitation through Customer’s privacy policy and/or employee guidelines and policies, to permit Company and its service providers to process and use Personal Data in accordance with the terms of this Agreement and privacy policy.The terms of the DPA located at https://www.videointerviews.io/privacy-policy are hereby incorporated herein by reference”.
        <br /><br />
        Pricing, Payments and Billing<br />
        The Customer shall pay Company a non-refundable annual or monthly fee in accordance with the terms of the relevant SOW or the Site (the “Fee”). Unless specified otherwise in the SOW, Customer shall pay the Fee and any and all amounts due within thirty (30) days of the date of invoice. All amounts payable under this Agreement are exclusive of any taxes (including, without limitations, sales tax, VAT, and similar taxes to the extent applicable). Except as expressly provided in this Agreement, each Party shall bear its own costs and expenses incurred in performance of this Agreement.
        <br /><br />
        Pricing<br />
        Unless otherwise stated in the SOW, Company reserves the right to change the prices for any of the Services at any time. Should Company change any pricing, Company shall provide its Customers with at least thirty (30) days’ notice.
        <br /><br />
        Method of Payments<br />
        To purchase Company Services, Customer must provide Company with a valid credit card or checking account debit information. Company presently accepts payments from Company Customers using a secure connection. Company reserves the right to choose the forms of payment accepted for Company Services, to refuse select forms of payment, to refuse service to anyone and to add or remove particular third parties from whom it will accept payments.
        <br /><br />
        Payment Processing<br />
        Company may make available to Customer various payment processing methods to facilitate the payment for the Services. Customer must abide by any relevant terms and conditions or other agreement, whether with Company or a third party, that governs the use of a given processing method. Company may add or remove payment processing methods at its sole discretion and without notice to Customer. Customer agrees to pay for any Services that Customer orders and that Company may charge Customer’s credit card or other form of payment that Customer indicates for any Services purchased, along with additional amounts (including any taxes). Customer agrees that Customer is solely responsible for all fees associated with the purchases made by the Customer on or through the Platform.
        <br /><br />
        Advance Billing<br />
        Company bills in advance for Services on a recurring basis. Company may, at its sole discretion, provide Customer with monthly, quarterly, semi-annual and/or annual subscription service plans from which to choose, depending on Customer’s payment method, account history and/or account preferences.By choosing a subscription service plan, method of payment, and applicable billing cycle, Customer authorizes Company to use the form of payment specified in Customer’s account preferences or settings to bill Customer automatically in advance for the chosen Services on a recurring basis for each applicable billing cycle until Customer’s account has been cancelled and the applicable subscription plan has concluded.Should Customer decide to cancel its account, the account will be effectively cancelled after the conclusion of Customer’s then-existing service plan.
        <br /><br />
        Renewals<br />
        For the convenience of its Company Customers, Company automatically renews subscription plans.
        <br /><br />
        No Refunds<br />
        Company does not refund purchased Services. Consequently, there will be no refunds for periods where Services were unused should Customer’s account be cancelled including, but not limited to, period of dormancy or time remaining on subscription plans. Moreover, should Customer enter into a quarterly, semi-annual or annual subscription plan wherein Customer makes monthly payments, subject to Section 6.8 below, Customer agrees to make monthly payments for the entire term of Customer’s subscription plan whether Customer uses or cancels the Services prior to the expiration of Customer’s subscription. Consequently, Company cannot cancel or refund monthly payments associated with subscription plans.
        <br /><br />
        Pausing of Account<br />
        Notwithstanding anything herein to the contrary, Customer may elect to pause its account (and shall notify the Company in such event), in which case the Customer will not be charged for such period, provided that the maximum amount of time for which a Customer will not be charged for a paused account shall be 3 months in the aggregate (following which the Company will charge the Customer in respect of such account, even if paused).
        <br /><br />
        Confidential Information<br />
        Each Party acknowledges that it may have access to certain confidential information of the other Party (“Confidential Information”). Confidential Information will include all information in any form that under the circumstances of its disclosure, should reasonably be considered confidential, including but not limited to trade secrets. Each Party agrees that it will not use Confidential Information of the other Party in any way, except as expressly required for the purposes of this Agreement, nor will it disclose to any third party (except as required by law or to that Party’s attorneys, accountants and other advisors as reasonably necessary on a need to know basis) any of the other Party’s Confidential Information and it will take reasonable precautions to protect the confidentiality of such information.
        Without limiting the generality of the above, Company’s Confidential Information shall also include (a) the terms and conditions of this Agreement, and (b) the Platform, the Services and all Intellectual Property embodied therein and all Intellectual Property rights relating thereto, and Customer’s Confidential Information will include all Customer Data and Personal Data.
        <br /><br />
        Disclaimer of Warranties; Limitation of Liability
        <br /><br />
        Disclaimer of Warranties<br />
        COMPANY DOES NOT WARRANT OR MAKE ANY REPRESENTATIONS REGARDING THE USE, THE INABILITY TO USE OR OPERATE, OR THE RESULTS OF THE USE OR OPERATION OF THE SERVICES AND THE PLATFORM (OR ANY PART THEREOF). THE SERVICES AND THE PLATFORM (AND ANY PART THEREOF), INCLUDING WITHOUT LIMITATION ANY CONTENT, DATA, MATERIALS, REPORTS AND ANY INFORMATION RELATED THERETO, ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF TITLE OR NON-INFRINGEMENT OR IMPLIED WARRANTIES OF USE, MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE OR USE, OR ANY REPRESENTATIONS OR WARRANTIES AS TO THE USABILITY, ACCURACY, QUALITY, AVAILABILITY, RELIABILITY, SUITABILITY, COMPLETENESS, TRUTHFULNESS, USEFULNESS, SECURITY OR EFFECTIVENESS OF ANY CONTENT, DATA, RESULTS, OR OTHER INFORMATION OBTAINED OR GENERATED BY COMPANY AND/OR CUSTOMER IN CONNECTION WITH CUSTOMER’S USE OF THE SERVICES.Without derogating from the generality of the above:
        Company does not warrant that the functions and features contained on the Platform will be uninterrupted or error-free, that defects will be corrected, that the Platform or any server that makes it available is free from viruses or other harmful components or that successful or accurate results or outcomes will result from Customer’s use of or access to the Platform (including any of its features and functions) or the Services.
        Customer acknowledges that any material or Content downloaded or otherwise obtained or accessed through the use of the Services (or by accessing the Platform) is done at Customer’s own discretion and risk and that Customer will be solely responsible for any damage to its computer system or any other device or loss of data that results from downloading any such material or Content.
        Company gives no guarantee to Customer that Customer will fill any job or position vacancy that Customer elects to upload onto and advertise or display on our Platform or that Customer will receive any responses from suitable candidates. At the same time, Company does not endorse or recommend any job seekers or anyone else who contacts Customer via or as a result of any information, material or Content on the Platform.
        Furthermore, Company accepts no responsibility for any communications or interactions between Customer and any persons, who respond to or contact Company, or whom Company contacts or responds to as a result of any Content Customer or anyone-else uploads, transmits, posts, publishes, displays or otherwise makes available on the Platform or any Content that Customer transmit to others.
        <br /><br />
        Aggregate Liability<br />
        IN NO EVENT WILL COMPANY’S AGGREGATE LIABILITY FOR ANY AND ALL CLAIMS, LOSSES OR DAMAGES ARISING OUT OF OR RELATING TO THIS AGREEMENT OR ANY SERVICES (WHETHER IN CONTRACT, EQUITY, NEGLIGENCE, TORT OR OTHERWISE) EXCEED THE AGGREGATE FEES PAID BY CUSTOMER TO COMPANY UNDER THIS AGREEMENT DURING THE TWELVE (12) MONTH PERIOD IMMEDIATELY PRECEDING THE DATE UPON WHICH THE APPLICABLE CAUSE OF ACTION ARISES.
        <br /><br />
        Indirect Damages<br />
        UNDER NO CIRCUMSTANCES WILL COMPANY BE LIABLE FOR SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES, INCLUDING, WITHOUT LIMITATION, LOST PROFIT OR LOSS RESULTING FROM BUSINESS INTERRUPTION OR LOSS OF DATA, EVEN IF COMPANY HAS BEEN ADVISED OF THE POSSIBILITY OR LIKELIHOOD OF SUCH DAMAGES. COMPANY WILL NOT BE LIABLE FOR ANY DELAY, LOSS OR DAMAGE ATTRIBUTABLE TO ANY SERVICE, PRODUCT OR ACTION OF ANY PERSON OTHER THAN COMPANY AND ITS EMPLOYEES.
        <br /><br />
        Company does not warrant that the functions and features contained on the Platform will be uninterrupted or error-free, that defects will be corrected, that the Platform or any server that makes it available is free from viruses or other harmful components or that successful or accurate results or outcomes will result from Customer’s use of or access to the Platform (including any of its features and functions) or the Services.
        Customer acknowledges that any material or Content downloaded or otherwise obtained or accessed through the use of the Services (or by accessing the Platform) is done at Customer’s own discretion and risk and that Customer will be solely responsible for any damage to its computer system or any other device or loss of data that results from downloading any such material or Content.
        Company gives no guarantee to Customer that Customer will fill any job or position vacancy that Customer elects to upload onto and advertise or display on our Platform or that Customer will receive any responses from suitable candidates. At the same time, Company does not endorse or recommend any job seekers or anyone else who contacts Customer via or as a result of any information, material or Content on the Platform.
        Furthermore, Company accepts no responsibility for any communications or interactions between Customer and any persons, who respond to or contact Company, or whom Company contacts or responds to as a result of any Content Customer or anyone-else uploads, transmits, posts, publishes, displays or otherwise makes available on the Platform or any Content that Customer transmit to others.
        <br /><br />
        Indemnification<br />
        Customer will indemnify Company for, and hold Company harmless from and against, any and all Liabilities (as defined herein) or Expenses (as defined herein) at any time due, owing, paid or incurred by, or assessed against, Company arising out of (a) a breach by Customer of this Agreement; or (b) any third party claim related to the collection, storage, transfer or other use of Data, Customer’s use of the Services, Platform or the Content, except to the extent the claim is solely attributable to the willful misconduct of Company; provided however, that Company must give Customer prompt notice in writing of the institution of the Proceeding (as defined below), permit Customer to defend the same and give Customer all available information assistance and authority (at Customer’s expense) in connection therewith. Customer, at its option, will have control of the defense of any such Proceeding including appeals thereof and all negotiations therefor, including the right to effect the settlement or compromise thereof, provided that (i) no settlement, consent order or consent judgment which involves any admission of any liability or wrongdoing, or any act or omission on the part of Company may be agreed to by Customer without Company’s prior written consent, which shall not be unreasonably withheld or delayed, and (b) Customer shall keep the Company informed of the status and progress of such Proceeding, the defense thereof and/or settlement negotiations with respect thereto. “Liabilities” means all liabilities, losses and claims (including judgments, interest, fines, penalties, attorneys’ fees due any other Party, court costs and amounts to be paid in settlement) reasonably incurred in connection with any Proceeding. “Expenses” includes all attorneys’ fees and costs, retainers, court costs, transcripts, experts’ fees, witness fees, travel expenses, computer costs, duplicating costs, printing and binding costs, telephone charges, postage, delivery service fees and all other disbursements or expenses reasonably incurred in connection with asserting or defending claims, and any expenses incurred in the enforcement of Customer’s obligations hereunder. “Proceeding” includes any threatened, pending or completed action, suit, arbitration, mediation, alternate dispute resolution mechanism, investigation, administrative hearing or any other proceeding, whether civil, criminal, administrative or investigative.
        <br /><br />
        Miscellaneous
        <br /><br />
        Relationship of the Parties<br />
        Nothing in this Agreement shall in any way be construed to constitute either Party as an agent, partner, joint-venturer, employee or representative of the other Party, and both Parties shall remain independent contractors.
        <br /><br />
        Publicity<br />
        The Company may issue a press release, case study or general marketing communications concerning its involvement with Customer, including mentioning Customer as a client on its website and using Customer’s logo for such purpose. Customer agrees to provide a reasonable level of cooperation and assistance in connection with development and publication of a case study related to Customer’s use of the Service.
        <br /><br />
        Notices<br />
        Any written notice connected with this Agreement will be sufficiently made on the mailing date if sent by, either: (a) registered, certified or first class – postage prepaid mail to the Party, or (b) electronic mail, in each case to the address set forth in the SOW or provided by Customer upon subscribing through the Site. In addition, notice by the Company to Customer for any reason (including changes to these Terms and Conditions, the Site, the Fee or similar matters, may be provided by a general posting on the Site.
        <br /><br />
        Force Majeure<br />
        Each Party to this Agreement will be excused for delays in performing or from its failure to perform hereunder (other than payment delays) to the extent that the delays or failures result from causes beyond the reasonable control of such Party; provided that, in order to be excused from delay or failure to perform, such Party must act diligently to remedy the cause of the delay or failure.
        <br /><br />
        Assignment<br />
        This Agreement will be binding upon Company’s or Customer’s successors or assigns, as the case may be. However, neither this Agreement nor any of Customer’s rights, privileges, duties or obligations under this Agreement may be assigned, sublicensed, sold, or otherwise transferred or encumbered by Customer without the prior written consent of Company, which shall not be unreasonably withheld or delayed.
        <br /><br />
        Governing Law<br />
        All claims arising from this Agreement will be governed by and interpreted in accordance with the laws of the State of Israel, without regard to conflicts of laws and principles. Any and all actions brought to enforce this Agreement or resolve any dispute arising out of this Agreement must be brought exclusively in authorized courts of Tel Aviv, Israel and each Party hereby consents to and agrees to submit to the exclusive personal jurisdiction and venue of such courts. The U.N. Convention on Contracts for the International Sale of Goods shall not apply to this Agreement.
        <br /><br />
        European Union Residents<br />
        If Customer resides in the European Union (EU) or if any transfer of information between Customer and the Services is governed by the European Union Data Protection Directive or national laws implementing that Directive, then Customer consents, and shall obtain any consent and approval required by applicable law, to the transfer of such information outside of the European Union to its country and to such other countries as may be contemplated by the features and activities provided via the Services.
        <br /><br />
        Waiver of Breach<br />
        No waiver by either Party of any breach of this Agreement will constitute a waiver of any other breach of the same or other provisions of this Agreement. No waiver by either Party will be effective unless made in writing and signed by an authorized representative of that Party.
        <br /><br />
        Severability<br />
        If any provision in this Agreement is invalid or unenforceable in any circumstance, its application in any other circumstances and the remaining provisions of this Agreement will not be affected thereby.
        <br /><br />
        Entire Agreement<br />
        This Agreement, together with any outstanding SOWs executed pursuant thereto, constitutes the entire agreement and understanding between the Parties relating to the subject matter hereof. This Agreement supersedes all prior written and oral agreements and all other communications between Company and Customer.
        <br /><br />
        No Third Party Beneficiaries<br />
        Each Party intends that this Agreement will not benefit or create any right or cause of action in or on behalf of, any person or entity other than Customer and Company.
        <br /><br />
        Interpretation and Priority of Documents<br />
        In the case of conflicts or inconsistencies between the terms of this Agreement and any SOW, the terms of the SOW will prevail, except as specifically stated otherwise. Unless designated as replacing a specific outstanding SOW, a new SOW will be considered to be in addition to then-outstanding SOWs.
        <br /><br />
        Authority; Counterparts<br />
        Customer’s signature is by an authorized representative of Customer and constitutes Customer’s acceptance of this Agreement and its agreement to be bound hereby. This Agreement may be executed and delivered by the Parties in counterparts (each of which will be considered for all purposes an original) and by e-mail transmission in PDF format, and when a counterpart has been executed and delivered by each of the Parties, by e-mail in PDF format or otherwise, all such counterparts will together constitute one agreement.
        <br /><br />
        Legal Advice Not Provided<br />
        Customer acknowledges and agrees that the Company has not and will not provide Customer with any legal advice on any subject, but particularly with respect to compliance with employment, data privacy or other relevant laws, rules, or regulations. Customer agrees not to construe any Company communications as legal advice.
        <br /><br />
        Headings; Interpretation<br />
        The Section headings in this Agreement are for identification purposes only and will not affect the interpretation of this Agreement. Unless business days are specified, all references to “days” means calendar days.
        <br /><br />
        Survival<br />
        Customer agrees that certain of these Terms and Conditions shall survive termination or expiration of Customer use of the Services to achieve the fundamental purposes of these Terms and Conditions including, but not limited to, Sections 3-8, and 10.
        <br /><br />
        Last Updated: 31 Dec, 2023
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button variant="outline-dark" className="rounded-0" onClick={onHandleClose}>Cancel</Button>
        <Button variant="dark" className="ms-2 rounded-0" onClick={onHandleAccept}>Accept Terms & Conditions</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PrivacyTerms;
