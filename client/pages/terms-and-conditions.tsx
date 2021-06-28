import React from 'react'
import styled from 'styled-components'
import { Text } from '../components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 650px;
  margin: ${({ theme }) => theme.space(12)} auto 0;
`

const General = styled.div`
  margin-top: ${({ theme }) => theme.space5};
  margin-bottom: ${({ theme }) => theme.space4};
`

const GeneralText = styled(Text)`
  margin-top: ${({ theme }) => theme.space2};
`

const TopOrderedList = styled.ol`
  margin-left: ${({ theme }) => theme.space6};
  margin-bottom: ${({ theme }) => theme.space4};
`

const TopListItem = styled.li`
  &:not(last-of-type) {
    margin-bottom: ${({ theme }) => theme.space1};
  }
`

const MainList = styled.ol``

const MainListItem = styled.li`
  > div {
    font-size: ${({ theme }) => theme.text[3]};
    font-variation-settings: 'wght' 550;
    margin-bottom: ${({ theme }) => theme.space2};
  }
  &:not(last-of-type) {
    margin-bottom: ${({ theme }) => theme.space5};
  }

  > ul {
    list-style-type: disc;
  }
  > ol {
    margin: ${({ theme }) => theme.space2} 0;
  }
  &::marker {
    font-variation-settings: 'wght' 550;
    font-size: ${({ theme }) => theme.text[3]};
  }
`

export default function TermsAndConditions() {
  return (
    <Wrapper>
      <Text size={7}>Terms of Service</Text>
      <Text size={2}>Last Updated: June 23, 2021</Text>
      <General>
        <Text size={4}>I. GENERAL TERMS.</Text>
        <GeneralText size={2}>
          These Terms of Service (“Agreement”) set forth the terms and
          conditions that apply to your access and use of the Churnur website.
          By accepting electronically (for example, clicking “I Agree”),
          installing, accessing or using the Service, you agree to be bound by
          the terms and conditions of this Agreement and the Churnur Privacy
          Statement, as they may be amended from time to time in the future. If
          you do not agree to this Agreement, then you may not use the Services.
        </GeneralText>
      </General>
      <TopOrderedList>
        <TopListItem>Accepting the Terms</TopListItem>
        <TopListItem>Privacy and Use of Your Personal Information</TopListItem>
        <TopListItem>Description of the Services</TopListItem>
        <TopListItem>Account Information</TopListItem>
        <TopListItem>Your Registration Information</TopListItem>
        <TopListItem>Your Use of the Service</TopListItem>
        <TopListItem>Use With Your Mobile Device</TopListItem>
        <TopListItem>Online and Mobile Alerts</TopListItem>
        <TopListItem>Churnur’s Intellectual Property Rights</TopListItem>
        <TopListItem>Access and Interference</TopListItem>
        <TopListItem>Rules for Posting</TopListItem>
        <TopListItem>Social Media Sites</TopListItem>
        <TopListItem>Disclaimer of Representations and Warranties</TopListItem>
        <TopListItem>
          Financial Information is not Financial Planning, Broker or Tax Advice
        </TopListItem>
        <TopListItem>Limitations on Churnur’s Liability</TopListItem>
        <TopListItem>Your Indemnification of Churnur</TopListItem>
        <TopListItem>Ending your relationship with Churnur</TopListItem>
        <TopListItem>Modifications</TopListItem>
        <TopListItem>Miscellaneous</TopListItem>
        <TopListItem>App Store</TopListItem>
      </TopOrderedList>
      <MainList>
        <MainListItem>
          <div>Accepting the Terms</div> By accessing or using Churnur, tools,
          features, software and/or functionality, including content, updates,
          and any new releases, you agree to be bound by this Agreement, whether
          you access or use the Services as a visitor (which means that you
          simply browse the Services without registering or creating an
          account), or a customer (which means that you have created or
          registered for an account with us). If you wish to become a customer
          or want to make use of the Services, you must read and confirm your
          acceptance of this Agreement.
          <br />
          <br />
          You may not use any of the Services and you may not accept this
          Agreement if you are not legally authorized to accept and be bound by
          these terms or are not at least 18 years of age and, in any event, of
          a legal age to form a binding contract with Churnur.
          <br />
          <br />
          Before you continue, you should print or save a local copy of this
          Agreement for your records.
        </MainListItem>
        <MainListItem>
          <div>Privacy and Use of Your Personal Information</div> You can view
          the Churnur Privacy Statement here and on the Site for the Services.
          You agree to the applicable Churnur Privacy Statement, and any changes
          published by Churnur. You agree that Churnur may use and maintain your
          data according to the Churnur’s Privacy Statement, as part of the
          Services. You give Churnur permission to combine information you enter
          or upload for the Services with that of other users of the Services
          and/or other Churnur services. For example, this means that Churnur
          may use your and other users’ non-identifiable, aggregated data to
          improve the Services or to design promotions.
          <br />
          <br />
          By providing a telephone number in connection with the Services, you
          verify that you are the current subscriber or owner of that number. In
          addition, you expressly agree that Churnur and its affiliates may
          contact you by telephone or text message (including through the use of
          artificial voices, prerecorded voice messages, and/or autodialed calls
          and text messages) to the telephone number you provide or to any
          number provided to us on your behalf, for various purposes including
          verifying your identity, providing you with important notices
          regarding your account or use of the Services, fulfilling yours
          requests, or letting you know about promotions or Churnur services we
          think we may be of interest to you. Your consent to receive automated
          calls and texts is completely voluntary, and you may opt out any time.
          You acknowledge that if you do not opt out, we may contact you even if
          your number is listed on a do-not-call list or if you cancel your
          account or terminate your relationship with us. You do not have to
          agree to receive promotional calls or texts as a condition of
          purchasing any goods or services.
          <br />
          <br />
          You understand and agree, for any text messages sent to you in
          connection with the Services, that: (a) message frequency may vary,
          (b) message and data rates may apply, and Churnur is not responsible
          for these charges, (c) you may reply HELP for information, (d) you can
          reply STOP to opt out at any time (though if you do, you agree to
          receive a single message confirming your opt-out), and (e) neither
          Churnur nor mobile carriers involved in the text messaging are liable
          for delayed or undelivered messages. To opt out of automated voice
          calls, you must provide us with written notice revoking your consent
          by contacting us as described in our Privacy Statement, and including
          your full name, mailing address, account number, and the specific
          phone number(s) you wish to opt out of such calls.
          <br />
          <br />
          You also acknowledge and agree that your telephone calls to or from
          Churnur or its affiliates may be monitored and recorded. You must
          notify us immediately of any breach of security or unauthorized use of
          your telephone. Although we will not be liable for losses caused by
          any unauthorized use of your telephone, you may be liable for our
          losses due to such unauthorized use.
        </MainListItem>
        <MainListItem>
          <div>Description of the Services</div> The Churnur Service is a
          personal credit card information management service that allows you to
          consolidate and track your credit card information.
        </MainListItem>
        <MainListItem>
          <div>Account Information</div> Churnur cannot always foresee or
          anticipate technical or other difficulties which may result in failure
          to obtain data or loss of data, and personalization settings, or from
          device operating environment malfunctions or other service
          interruptions. Churnur cannot assume responsibility for the
          timeliness, accuracy, deletion, non-delivery or failure to store any
          user data, communications or personalization settings.
        </MainListItem>
        <MainListItem>
          <div>Your Registration Information and Electronic Communications</div>
          You agree and understand that you are responsible for maintaining the
          confidentiality of your password which, together with your LoginID,
          allows you to access the Sites. That LoginID and password, together
          with any mobile number or other information you provide form your
          “Registration Information.” By providing us with your e-mail address,
          you consent to receive all required notices and information.
          Electronic communications may be posted on the Services site and/or
          delivered to your e-mail address that we have on file for you. It is
          your responsibility to provide us with your complete, accurate contact
          information, or promptly update us in the event you change your
          information or ownership of your telephone number or other information
          changes. If we discover that any information provided in connection
          with your account is false or inaccurate, we may suspend or terminate
          your account at any time. Your consent to receive communications
          electronically is valid until you end your relationship with us.
          <br />
          <br />
          You may print a copy of any electronic communications and retain it
          for your records. We reserve the right to terminate or change how we
          provide electronic communications and will provide you with
          appropriate notice in accordance with applicable law.
          <br />
          <br />
          If you become aware of any unauthorized use of your Registration or
          Account Information for the Services, you agree to notify Churnur
          immediately at the email address - help@churnur.com.
        </MainListItem>

        <MainListItem>
          <div>Your Use of the Services</div> Your right to access and use the
          Site and the Services is personal to you and is not transferable by
          you to any other person or entity. You are only entitled to access and
          use the Sites and Services for lawful purposes.
        </MainListItem>

        <MainListItem>
          <div>Use With Your Mobile Device</div> Use of these Services may be
          available through a compatible mobile device, Internet and/or network
          access and may require software. You agree that you are solely
          responsible for these requirements, including any applicable changes,
          updates and fees as well as the terms of your agreement with your
          mobile device and telecommunications provider. CHURNUR MAKES NO
          WARRANTIES OR REPRESENTATIONS OF ANY KIND, EXPRESS, STATUTORY OR
          IMPLIED AS TO: (i) THE AVAILABILITY OF TELECOMMUNICATION SERVICES FROM
          YOUR PROVIDER AND ACCESS TO THE SERVICES AT ANY TIME OR FROM ANY
          LOCATION; (ii) ANY LOSS, DAMAGE, OR OTHER SECURITY INTRUSION OF THE
          TELECOMMUNICATION SERVICES; (iii) ANY LOSS, DAMAGE, OR OTHER SECURITY
          INTRUSION FROM THE USE OF ROOTKIT MOBILE DEVICE OR YOUR DEVICE
          OPERATING ENVIRONMENT; AND (iv) ANY DISCLOSURE OF INFORMATION TO THIRD
          PARTIES OR FAILURE TO TRANSMIT ANY DATA, COMMUNICATIONS OR SETTINGS
          CONNECTED WITH THE SERVICES.
        </MainListItem>

        <MainListItem>
          <div>Online and Mobile Alerts</div> Churnur may from time to time
          provide automatic alerts and voluntary account-related alerts.
          Automatic alerts may be sent to you following certain changes to your
          account or information, such as a change in your Registration
          Information.
          <br />
          <br />
          Voluntary account alerts may be turned on by default as part of the
          Services. They may then be customized, deactivated or reactivated by
          you. These alerts allow you to choose alert messages for your Credit
          Cards. Churnur may add new alerts from time to time, or cease to
          provide certain alerts at any time upon its sole discretion. Each
          alert has different options available, and you may be asked to select
          from among these options upon activation of your alerts service.
          <br />
          <br />
          You understand and agree that any alerts provided to you through the
          Services may be delayed or prevented by a variety of factors. Churnur
          may make commercially reasonable efforts to provide alerts in a timely
          manner with accurate information, but cannot guarantee the delivery,
          timeliness, or accuracy of the content of any alert. Churnur will not
          be liable for any delays, failure to deliver, or misdirected delivery
          of any alert; for any errors in the content of an alert; or for any
          actions taken or not taken by you or any third party in reliance on an
          alert.
          <br />
          <br />
          Electronic alerts will be sent to the email address or mobile number
          you have provided for the Services. If your email address or your
          mobile number changes, you are responsible for informing us of that
          change.
          <br />
          <br />
          Alerts may also be sent to a mobile device that accepts text messages.
          Changes to your email address and mobile number will apply to all of
          your alerts.
          <br />
          <br />
          Because alerts are not encrypted, we will never include your passcode.
          However, alerts may include your Login ID and some information about
          your accounts. Depending upon which alerts you select, information
          such as an account balance or the due date for your credit card
          payment may be included. Anyone with access to your email will be able
          to view the content of these alerts. At any time you may disable
          future alerts.
        </MainListItem>

        <MainListItem>
          <div>Churnur’s Intellectual Property Rights</div> The contents of the
          Services, including its “look and feel” (e.g., text, graphics, images,
          logos and button icons), photographs, editorial content, notices,
          software (including html-based computer programs) and other material
          are protected under both United States and other applicable copyright,
          trademark and other laws. The contents of the Services belong or are
          licensed to Churnur or its software or content suppliers. Churnur
          grants you the right to view and use the Services subject to these
          terms. You may download or print a copy of information for the
          Services for your personal, internal and non-commercial use only. Any
          distribution, reprint or electronic reproduction of any content from
          the Services in whole or in part for any other purpose is expressly
          prohibited without our prior written consent. You agree not to use,
          nor permit any third party to use, the Site or the Services or content
          in a manner that violates any applicable law, regulation or this
          Agreement.
        </MainListItem>

        <MainListItem>
          <div>Access and Interference</div> You agree that you will not:
          <ul>
            <li>
              Use any robot, spider, scraper, deep link or other similar
              automated data gathering or extraction tools, program, algorithm
              or methodology to access, acquire, copy or monitor the Services or
              any portion of the Services, without Churnur’s express written
              consent, which may be withheld in Churnur’s sole discretion;
            </li>

            <li>
              Use or attempt to use any engine, software, tool, agent, or other
              device or mechanism (including without limitation browsers,
              spiders, robots, avatars or intelligent agents) to navigate or
              search the services, other than the search engines and search
              agents available through the Services and other than generally
              available third-party web browsers (such as Microsoft Internet
              Explorer or Safari);
            </li>

            <li>
              Post or transmit any file which contains viruses, worms, Trojan
              horses or any other contaminating or destructive features, such as
              rootkits, keyloggers, bots or that otherwise interfere with the
              proper working of the Services;
            </li>

            <li>
              Attempt to decipher, decompile, disassemble, or reverse-engineer
              any of the software comprising or in any way making up a part of
              the Services; or
            </li>

            <li>
              Attempt to gain unauthorized access to any portion of the
              Services.
            </li>
          </ul>
        </MainListItem>

        <MainListItem>
          <div>Rules for Posting</div> As part of the Services, Churnur may
          allow you to post content on bulletin boards, blogs and at various
          other publicly available locations on the Sites. These forums may be
          hosted by Churnur or by one of our third party service providers on
          Churnur’s behalf. You agree in posting content to follow certain
          rules.
          <ul>
            <li>
              You are responsible for all content you submit, upload, post or
              store through the Services.
            </li>

            <li>
              You are responsible for all materials ("Content") uploaded, posted
              or stored through your use of the Services. You grant Churnur a
              worldwide, royalty-free, non-exclusive license to host and use any
              Content provided through your use of the Services. Archive your
              Content frequently. You are responsible for any lost or
              unrecoverable Content. You must provide all required and
              appropriate warnings, information and disclosures. Churnur is not
              responsible for the Content or data you submit through the
              Services. By submitting content to us, you represent that you have
              all necessary rights and hereby grant us a perpetual, worldwide,
              non-exclusive, royalty-free, sublicenseable and transferable
              license to use, reproduce, distribute, prepare derivative works
              of, modify, display, and perform all or any portion of the content
              in connection with Services and our business, including without
              limitation for promoting and redistributing part or all of the
              site (and derivative works thereof) in any media formats and
              through any media channels. You also hereby grant each user a
              non-exclusive license to access your posted content through the
              Sites, and to use, reproduce, distribute, prepare derivative works
              of, display and perform such content as permitted through the
              functionality of the Services and under this Agreement.
            </li>

            <li>
              You agree not to use, nor permit any third party to use, the
              Services to a) post or transmit any message which is libelous or
              defamatory, or which discloses private or personal matters
              concerning any person; b)post or transmit any message, data, image
              or program that is indecent, obscene, pornographic, harassing,
              threatening, abusive, hateful, racially or ethnically offensive;
              that encourages conduct that would be considered a criminal
              offense, give rise to civil liability or violate any law; or that
              is otherwise inappropriate; c)post or transmit any message, data,
              image or program that would violate the property rights of others,
              including unauthorized copyrighted text, images or programs, trade
              secrets or other confidential proprietary information, and
              trademarks or service marks used in an infringing fashion; or d)
              interfere with other users’ use of the Service, including, without
              limitation, disrupting the normal flow of dialogue in an
              interactive area of the Sites, deleting or revising any content
              posted by another person or entity, or taking any action that
              imposes a disproportionate burden on the Service infrastructure or
              that negatively affects the availability of the Service to others.
            </li>

            <li>
              Except where expressly permitted, you may not post or transmit
              charity requests; petitions for signatures; franchises,
              distributorship, sales representative agency arrangements, or
              other business opportunities (including offers of employment or
              contracting arrangements); club memberships; chain letters; or
              letters relating to pyramid schemes. You may not post or transmit
              any advertising, promotional materials or any other solicitation
              of other users to use goods or services except in those areas
              (e.g., a classified bulletin board) that are designated for such
              purpose.
            </li>

            <li>
              You agree that any employment or other relationship you form or
              attempt to form with an employer, employee, or contractor whom you
              contact through areas of the Sites that may be designated for that
              purpose is between you and that employer, employee, or contractor
              alone, and not with us.
            </li>

            <li>
              You may not copy or use personal identifying or business contact
              information about other users without their permission.
              Unsolicited e-mails, mailings, telephone calls, or other
              communications to individuals or companies whose contact details
              you obtain through the Services are prohibited.
            </li>

            <li>
              You agree that we may use any content, feedback, suggestions, or
              ideas you post in any way, including in future modifications of
              the Service, other products or services, advertising or marketing
              materials. You grant us a perpetual, worldwide, fully
              transferable, sublicensable, non-revocable, fully paid-up, royalty
              free license to use the content and feedback you provide to us in
              any way.
            </li>

            <li>
              The Services may include a community forum or other social
              features to exchange information with other users of the Services
              and the public. Churnur does not support and is not responsible
              for the content in these community forums. Please use respect when
              you interact with other users. Do not reveal information that you
              do not want to make public. Users may post hypertext links to
              content of third parties for which Churnur is not responsible.
            </li>
          </ul>
        </MainListItem>

        <MainListItem>
          <div>Social media sites</div>
          Churnur may provide experiences on social media and other platforms
          that enable online sharing and collaboration among users of those
          sites. Any content you post, such as pictures, information, opinions,
          or any Personal Information that you make available to other
          participants on these social platforms, is subject to the terms of
          service and privacy policies of those platforms. Please refer to those
          platforms to better understand your rights and obligations with regard
          to such content.
        </MainListItem>

        <MainListItem>
          <div>Disclaimer of Representations and Warranties</div> THE SITES,
          SERVICES AND ADD-ON SERVICES (COLLECTIVELY “SERVICES”), INFORMATION,
          DATA, FEATURES, AND ALL CONTENT AND ALL SERVICES AND PRODUCTS
          ASSOCIATED WITH THE SERVICES OR PROVIDED THROUGH THE SERVICES (WHETHER
          OR NOT SPONSORED) ARE PROVIDED TO YOU ON AN “AS-IS” AND “AS AVAILABLE”
          BASIS. CHURNUR, AND ITS THIRD PARTY PROVIDERS, MAKE NO REPRESENTATIONS
          OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE CONTENT OR
          OPERATION OF THE SITE OR OF THE SERVICES. YOU EXPRESSLY AGREE THAT
          YOUR USE OF THE SERVICES IS AT YOUR SOLE RISK.
          <br />
          <br />
          NEITHER CHURNUR OR ITS SUPPLIERS MAKE ANY REPRESENTATIONS, WARRANTIES
          OR GUARANTEES, EXPRESS OR IMPLIED, REGARDING THE ACCURACY, RELIABILITY
          OR COMPLETENESS OF THE CONTENT ON THE SITES OR OF THE SERVICES
          (WHETHER OR NOT SPONSORED), AND EXPRESSLY DISCLAIMS ANY WARRANTIES OF
          NON-INFRINGEMENT OR FITNESS FOR A PARTICULAR PURPOSE. NEITHER CHURNUR
          OR ITS SUPPLIERS MAKE ANY REPRESENTATION, WARRANTY OR GUARANTEE THAT
          THE CONTENT THAT MAY BE AVAILABLE THROUGH THE SERVICES IS FREE OF
          INFECTION FROM ANY VIRUSES OR OTHER CODE OR ROOTKITS OR COMPUTER
          PROGRAMMING ROUTINES THAT CONTAIN CONTAMINATING OR DESTRUCTIVE
          PROPERTIES OR THAT ARE INTENDED TO DAMAGE, SURREPTITIOUSLY INTERCEPT
          OR EXPROPRIATE ANY SYSTEM, DEVICE OPERATING ENVIRONMENT, DATA OR
          PERSONAL INFORMATION.
          <br />
          <br />
          SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN WARRANTIES OR
          THE LIMITATION OR EXCLUSION OF LIABILITY FOR INCIDENTAL OR
          CONSEQUENTIAL DAMAGES. IN SUCH STATES LIABILITY IS LIMITED TO THE
          EXTENT PERMITTED BY LAW. ACCORDINGLY, SOME OF THE ABOVE LIMITATIONS OF
          SECTIONS 15 AND 17 OF THIS PROVISION MAY NOT APPLY TO YOU.
        </MainListItem>

        <MainListItem>
          <div>
            Financial Information is not Financial Planning, Broker or Tax
            Advice
          </div>
          THE SERVICES ARE NOT INTENDED TO PROVIDE LEGAL, TAX OR
          INVESTMENT/RETIREMENT PLANNING ADVICE OR INTENDED TO SERVE AS TAX
          PREPARATION SERVICES. The Services are intended only to assist you in
          your credit card organization and decision-making and is broad in
          scope. Your personal financial situation is unique, and any
          information and advice obtained through the Service may not be
          appropriate for your situation. Accordingly, before making any final
          decisions or implementing any financial strategy, you should consider
          obtaining additional information and advice from your accountant or
          other certified financial advisers who are fully aware of your
          individual circumstances.
        </MainListItem>

        <MainListItem>
          <div>Limitations on Churnur’s Liability</div> CHURNUR SHALL IN NO
          EVENT BE RESPONSIBLE OR LIABLE TO YOU OR TO ANY THIRD PARTY, WHETHER
          IN CONTRACT, WARRANTY, TORT (INCLUDING NEGLIGENCE) OR OTHERWISE, FOR
          ANY INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, EXEMPLARY,
          LIQUIDATED OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF
          PROFIT, REVENUE OR BUSINESS, ARISING IN WHOLE OR IN PART FROM YOUR
          ACCESS TO THE SITES, YOUR USE OF THE SERVICES, INCLUDING ADD-ON
          SERVICES, DEVICE OPERATING ENVIRONMENT, THE SITES OR THIS AGREEMENT,
          EVEN IF CHURNUR HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
          NOTWITHSTANDING ANYTHING TO THE CONTRARY IN THIS AGREEMENT, CHURNUR’S
          LIABILITY TO YOU FOR ANY CAUSE WHATEVER AND REGARDLESS OF THE FORM OF
          THE ACTION, WILL AT ALL TIMES BE LIMITED TO A MAXIMUM OF $500.00 (FIVE
          HUNDRED UNITED STATES DOLLARS).
        </MainListItem>

        <MainListItem>
          <div>Your Indemnification of Churnur</div> You shall defend, indemnify
          and hold harmless Churnur and its employees, from and against all
          claims, suits, proceedings, losses, liabilities, and expenses
          (including reasonable attorneys’ fees), whether in tort, contract, or
          otherwise, that arise out of or relate, including but not limited to
          attorney’s fees, in whole or in part arising out of or attributable to
          any breach of this Agreement or any activity by you in relation to the
          Sites or your use of the Services, including add-on Services and/or
          device operating environment.
        </MainListItem>

        <MainListItem>
          <div>Ending your relationship with Churnur.com</div> This Agreement
          will continue to apply until terminated by either you or Churnur as
          set out below. If you want to terminate this legal agreement for the
          Services and close your account, login to your Churnur Account and
          follow the instructions to delete your account.
          <br />
          <br />
          Please note that if you wish to remove Churnur from your mobile
          devices, then you may delete the Churnur App, however that will only
          delete your Churnur data from the device. If you want to delete your
          Churnur account, follow the instructions in the preceding paragraph.
          <br />
          <br />
          Churnur may at any time, terminate its legal agreement with you and
          access to the Services:
          <ol>
            <li>
              if you have breached any provision of this Agreement (or have
              acted in a manner which clearly shows that you do not intend to,
              or are unable to comply with the provisions of this Agreement);
            </li>

            <li>
              if Churnur in its sole discretion believes it is required to do so
              by law (for example, where the provision of the Service to you is,
              or becomes, unlawful);
            </li>

            <li>
              for any reason and at any time with or without notice to you; or
            </li>

            <li>
              immediately upon notice to the e-mail address provided by you as
              part of your Registration Information.
            </li>
          </ol>
          You acknowledge and agree that Churnur may immediately deactivate or
          delete your account and all related information and files in your
          account and/or prohibit any further access to all files and the
          Services by you. Further, you agree that Churnur will not be liable to
          you or any third party for any termination of your access to the
          Services.
        </MainListItem>

        <MainListItem>
          <div>Modifications</div> Churnur reserves the right at any time and
          from time to time to modify or discontinue, temporarily or
          permanently, the Sites or Services, including add-on Services with or
          without notice. Churnur reserves the right to change the Services,
          including fees as may be applicable, in our sole discretion and from
          time to time. In such an event, if you are a paid user to add-on
          subscription Services, Churnur will provide notice to you. If you do
          not agree to the changes after receiving a notice of the change to the
          Services, you may stop using the Services. Your use of the Services,
          after you are notified of any change(s) will constitute your agreement
          to such change(s). You agree that Churnur will not be liable to you or
          to any third party for any modification, suspensions, or
          discontinuance of the Services.
          <br />
          <br />
          Churnur may modify this Agreement from time to time. Any and all
          changes to this Agreement may be provided to you by electronic means
          (i.e., via email or by posting the information on the Sites). In
          addition, the Agreement will always indicate the date it was last
          revised. You are deemed to accept and agree to be bound by any changes
          to the Agreement when you use the Services after those changes are
          posted.
        </MainListItem>

        <MainListItem>
          <div>
            Allegations of Copyright and Trademark Infringements; Notification
          </div>
          Churnur respects the intellectual property rights of others and
          Churnur asks that users of the Site and Services do the same. If you
          believe that your intellectual property is being used on the Site in a
          way that constitutes copyright infringement, please provide our
          Designated Agent (set forth below) the following information (as
          required by Section 512(c)(3) of the Digital Millennium Copyright
          Act):
          <ul>
            <li>
              A physical or electronic signature of a person authorized to act
              on behalf of the owner of an exclusive right that is allegedly
              infringed.
            </li>

            <li>
              Identification of the copyrighted work claimed to have been
              infringed, or, if multiple copyrighted works at a single online
              site are covered by a single notification, a representative list
              of such works at that site.
            </li>

            <li>
              Identification of the material that is claimed to be infringing or
              to be the subject of infringing activity and that is to be removed
              or access to which is to be disabled, and information reasonably
              sufficient to permit the service provider to locate the material.
            </li>

            <li>
              Information reasonably sufficient to permit the service provider
              to contact the complaining party, such as an address, telephone
              number, and, if available, an electronic mail address at which the
              complaining party may be contacted.
            </li>

            <li>
              A statement that the complaining party has a good faith belief
              that use of the material in the manner complained of is not
              authorized by the copyright owner, its agent, or the law.
            </li>

            <li>
              A statement that the information in the notification is accurate,
              and under penalty of perjury, that the complaining party is
              authorized to act on behalf of the owner of an exclusive right
              that is allegedly infringed.
            </li>
          </ul>
          The information specified above must be sent to Churnur’s Designated
          Agent.
          <br />
          <br />
          Please note that Section 512(f) of the Digital Millennium Copyright
          Act may impose liability for damages on any person who knowingly sends
          meritless notices of infringement. Please do not make false claims.
          <br />
          <br />
          Any information or correspondence that you provide to Churnur may be
          shared with third parties, including the person who provided Churnur
          with the allegedly infringing material.
          <br />
          <br />
          Upon receipt of a bona fide infringement notification by the
          Designated Agent, it is Churnur’s policy to remove or disable access
          to the infringing material, notify the user that it has removed or
          disabled access to the material, and, for repeat offenders, to
          terminate such user's access to the service.
          <br />
          <br />
          If you believe that your content should not have been removed for
          alleged copyright infringement, you may send Churnur’s Designated
          Agent a written counter-notice with the following information:
          <ul>
            <li>
              Identification of the copyrighted work that was removed, and the
              location on the Site where it would have been found prior to its
              removal;
            </li>

            <li>
              A statement, under penalty of perjury, that you have a good faith
              belief that the content was removed as a result of a mistake or
              misidentification; and
            </li>

            <li>
              Your physical or electronic signature, together with your contact
              information (address, telephone number and, if available, email
              address).
            </li>
          </ul>
          If a counter-notice is received by the Designated Agent, we may send a
          copy of the counter-notice to the original complaining party informing
          that person that it may replace the removed material or cease
          disabling it in 10 business days. Unless the copyright owner files an
          action seeking a court order against the user, the removed material
          may be replaced or access to it restored in 10 to 14 business days or
          more after receipt of the counter-notice, at our discretion.
        </MainListItem>

        <MainListItem>
          <div>App Store.</div> The following applies to any App Store Sourced
          Application accessed through or downloaded from the Apple App Store:
          <ol>
            <li>
              You acknowledge and agree that (i) the Agreement is between you
              and Churnur only, and not Apple, and (ii) Churnur, not Apple, is
              solely responsible for the App Store Sourced Application and
              content thereof. Your use of the App Store Sourced Application
              must comply with the App Store Terms of Service.
            </li>

            <li>
              You acknowledge that Apple has no obligation whatsoever to furnish
              any maintenance and support services with respect to the App Store
              Sourced Application.
            </li>

            <li>
              In the event of any failure of the App Store Sourced Application
              to conform to any applicable warranty, you may notify Apple, and
              Apple will refund the purchase price for the App Store Sourced
              Application to you and to the maximum extent permitted by
              applicable law, Apple will have no other warranty obligation
              whatsoever with respect to the App Store Sourced Application. As
              between Churnur and Apple, any other claims, losses, liabilities,
              damages, costs or expenses attributable to any failure to conform
              to any warranty will be the sole responsibility of Churnur.
            </li>

            <li>
              You and Churnur acknowledge that, as between Churnur and Apple,
              Apple is not responsible for addressing any claims you have or any
              claims of any third party relating to the App Store Sourced
              Application or your possession and use of the App Store Sourced
              Application, including, but not limited to: (i) product liability
              claims; (ii) any claim that the App Store Sourced Application
              fails to conform to any applicable legal or regulatory
              requirement; and (iii) claims arising under consumer protection or
              similar legislation.
            </li>

            <li>
              You and Churnur acknowledge that, in the event of any third-party
              claim that the App Store Sourced Application or your possession
              and use of that App Store Sourced Application infringes that third
              party’s intellectual property rights, as between Churnur and
              Apple, Churnur, not Apple, will be solely responsible for the
              investigation, defense, settlement and discharge of any such
              intellectual property infringement claim to the extent required by
              the Agreement.
            </li>

            <li>
              You and Churnur acknowledge and agree that Apple, and Apple’s
              subsidiaries, are third-party beneficiaries of the Agreement as
              related to your license of the App Store Sourced Application, and
              that, upon your acceptance of the Agreement, Apple will have the
              right (and will be deemed to have accepted the right) to enforce
              the Agreement as related to your license of the App Store Sourced
              Application against you.
            </li>
          </ol>
        </MainListItem>
      </MainList>
    </Wrapper>
  )
}
