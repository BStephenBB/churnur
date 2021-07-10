import React from 'react'
import styled from 'styled-components'
import { Text } from '../components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 650px;
  margin: ${({ theme }) => theme.space(12)} auto 0;
  padding-bottom: ${({ theme }) => theme.space6};
`

const General = styled.div`
  margin-top: ${({ theme }) => theme.space5};
`

const Section = styled.div`
  margin-top: ${({ theme }) => theme.space4};
`

const GeneralText = styled(Text)`
  margin-top: ${({ theme }) => theme.space2};
`

const UnorderedList = styled.ul`
  margin-top: ${({ theme }) => theme.space2};
  margin-left: ${({ theme }) => theme.space6};
  margin-bottom: ${({ theme }) => theme.space4};
  list-style-type: disc;
`

export default function PrivacyPolity() {
  return (
    <Wrapper>
      <Text size={6}>Churnur Global Privacy Statement</Text>
      <Text size={2}>Last Updated: June 23, 2021</Text>
      <General>
        <Text size={4}>Introduction and overview</Text>
        <GeneralText size={2}>
          Churnur leverages technology responsibly to power prosperity around
          the world, and we believe that everyone has a right to privacy. At
          Churnur, we view privacy as a key part of the value that we deliver to
          our customers.
        </GeneralText>
      </General>
      <Section>
        <Text size={4}>Scope of this Privacy Statement and our role</Text>
        <GeneralText size={2}>
          We’re providing this Global Privacy Statement (which we’ll refer to as
          “Privacy Statement”) to explain how we collect, use, and share
          information when you interact with us and our offerings, services and
          experiences. This Privacy Statement is global in nature, meaning that
          it is applicable to offerings within Churnur, and it describes our
          privacy practices when we process:
          <br />
          <br />
          a) Personal information for the purposes of providing the benefits of
          the Churnur platform, which is collectively, all of Churnur’s
          services, experiences and software (including through our mobile
          applications and desktop applications) by Churnur; and/or
          <br />
          <br />
          b) Personal information as necessary to manage, run and improve our
          business.
          <br />
          <br />
          Churnur determines the purposes and means of the processing of
          personal information.
        </GeneralText>
      </Section>
      <Section>
        <Text size={4}>Information we receive from you</Text>
        <GeneralText>
          The personal information that we receive about you depends on the
          context of your interactions with Churnur, how you configure your
          account and the choices that you make, including your privacy
          settings. Personal information that you provide may also depend upon
          what services or experiences you use, your location and applicable
          law.
        </GeneralText>
        <UnorderedList>
          <li>
            Creating an account. We collect information when you create an
            account, interact with Churnur or activate a subscription. Personal
            information may include your contact information (such as your name,
            address, phone number and email), profile photo, billing information
            (your payment information), usernames and credentials.
          </li>
          <li>
            Customer support, product research, training and feedback. We may
            collect personal information when you reach out to us for support,
            give us feedback, participate in optional surveys, product research
            or training and you choose to share.
          </li>
          <li>
            Social and community content. We receive content you post on our
            social media pages and our community pages.
          </li>
          <li>
            Device information. We may collect information about your device
            such as Internet Protocol (“IP”) addresses, log information, error
            messages, device type, and unique device identifiers. For example,
            we may collect IP addresses from you as part of our sign in and
            security features.
          </li>
          <li>
            Usage information. We may collect usage information such as the
            pages you viewed, the features you use, your browser type and
            details about any links with which you interact.
          </li>
          <li>
            Location information. Certain features in the Churnur Platform may
            collect your precise location information, device motion
            information, or both, if you grant permission to do so in your
            device settings.
          </li>
          <li>
            Information from cookies and other technologies. Churnur and our
            service providers may use commonly used tools such as cookies, web
            beacons, pixels, local shared objects and similar technologies
            (collectively "cookies") to collect information about you (“Cookie
            Information”) so we can provide the experiences you request,
            recognize your visit, track your interactions, and improve your and
            other customers' experience. You have control over some of the
            information we collect from Cookies and how we use it.
          </li>
          <li>
            Information stored locally. Some of our web-enabled desktop services
            and offerings synchronize with the information on your computer. In
            doing so, we may collect information such as device information,
            product usage, and error reports. We may also store personal
            information locally on your device.
          </li>
        </UnorderedList>
      </Section>
      <Section>
        <Text size={4}>How we use personal information</Text>
        <GeneralText>
          We collect and process personal information from you only where:
        </GeneralText>
        <UnorderedList>
          <li>We have your consent to do so;</li>
          <li>
            We need the personal information to perform a contract with you or
            provide a service to you;
          </li>
          <li>
            Provide you with the benefits of the Churnur Platform and operate
            our business;
          </li>
          <li>
            The processing is in our legitimate business interests in those
            jurisdictions where legitimate business interest is a legitimate
            basis for processing; or
          </li>
          <li>
            We need to comply with legal requirements, including applicable laws
            and regulations.
          </li>
        </UnorderedList>
        <GeneralText>
          Personal information is used to operate our business for the following
          purposes that are required to originate and maintain our relationship
          with you, including but not limited to:
        </GeneralText>
        <UnorderedList>
          <li>Provide you with the Churnur Platform and create your account</li>
          <li>Improve our products and services</li>
          <li>
            Run and manage our business, including resolving billing and
            financial disputes
          </li>
          <li>Provide features to you.</li>
          <li>Communicate with you.</li>
          <li>Advertise and market our services and experiences</li>
          <li>
            Personalize your experience and tailor recommendations and offers
            presented to you, including through the development of insights
            about you and your needs Provide you with support and resolve
            disputes
          </li>
          <li>Conduct research.</li>
          <li>Comply with our legal and regulatory requirements</li>
          <li>
            Protect the rights, property, safety or security of the Churnur
            Platform, our customers, employees or others and prevent fraudulent
            or illegal activity
          </li>
          <li>
            To exercise our rights in the course of judicial, administrative or
            arbitration proceedings
          </li>
          <li>
            To enforce, remedy or apply our Terms of Service or other agreements
            and/or
          </li>
          <li>
            For other purposes that are compatible with the disclosed purposes
            if and where this is permitted by applicable law.
          </li>
        </UnorderedList>
      </Section>
      <Section>
        <Text size={4}>Automated Processing</Text>
        <GeneralText>
          To provide you with valuable personalized advice, recommendations and
          experiences, we may process your personal information using automated
          and manual (human) methods. Our automated methods include artificial
          intelligence (AI) and a range of technologies that help our services
          learn and reason to improve our ability to personalize and enhance
          your experience in the Churnur Platform.
        </GeneralText>
      </Section>
      <Section>
        <Text size={4}>How we share your information</Text>
        <GeneralText>
          We may share your information in the following circumstances:
          <br />
          <br />
          With your consent. Without explicit permission, sell, publish or share
          data entrusted to us by a customer that identifies the customer or any
          person, except for as outlined below, we only share your information
          with third parties when you have directed us to do so.
          <br />
          <br />
          When you connect to your social media account. Some of our features
          enable you to connect to a social media account or share information
          on social media platforms, like Facebook and Twitter. Any information
          you choose to share on social media may potentially be visible to a
          global audience and will be subject to the social media provider's
          privacy policies (not this Privacy Statement). You should take care
          only to share information on social media that you are comfortable
          sharing.
          <br />
          <br />
          For research. With appropriate controls, we may share information with
          third-parties, such as academic institutions, government and
          non-profit organizations, for research purposes or to publish academic
          or policy-related materials. We only share information in a way that
          would not allow any individual to be identified.
          <br />
          <br />
          For joint features, sales, promotions and events. We may share your
          information with third-parties companies who are jointly providing
          features, sales initiatives, promotions or events with us.
          <br />
          <br />
          When you publicly post the information. We may provide opportunities
          for you to publicly post reviews, questions, comments, suggestions or
          other content, which may include personal information, such as your
          name or user name. Anything you share in a public forum is public, and
          you should think carefully before you decide to share.
          <br />
          <br />
          For mergers and acquisitions. If we are involved with a merger, asset
          sale, financing, liquidation, bankruptcy, or the acquisition of all or
          part of our business to another company, we may share your information
          with that company and its advisors before and after the transaction
          date.
          <br />
          <br />
          No sale of personal information to third parties. We do not and will
          not sell personal information to third parties. We do share personal
          information with third parties for the business purposes described in
          this Statement.
          <br />
          <br />
          Cookies and other tracking technologies. You can find information on
          changing your browser settings to opt-out of cookies in your browser
          settings. In certain countries, you may also be able to make changes
          to your cookies settings by using our cookie preferences tool. If you
          disable some or all of the cookies the service, or parts of the
          service may not work.
          <br />
          <br />
          For advertising and analytics. Churnur may use advertising networks
          and other providers to display advertising on our Churnur Platform.
          Our advertising partners may place cookies on unaffiliated websites in
          order to serve advertisements that may be relevant to you based on
          your browsing activities and interests and determine the effectiveness
          of such advertisements. See also the “Country and Region-Specific
          Terms” section below for additional pages.
          <br />
          <br />
          The Churnur Platform is not currently configured to respond to
          browsers’ “Do Not Track” signals because at this time no formal “Do
          Not Track” standard has been adopted.
          <br />
          <br />
          For legal reasons. We may share your information with third-parties
          for legal reasons without your consent, and as permitted by law,
          including:
        </GeneralText>
        <UnorderedList>
          <li>
            When we reasonably believe disclosure is required in order to comply
            with a subpoena, court order, or other applicable law, regulation or
            legal process
          </li>
          <li>
            To protect the rights, property, or safety of Churnur, our customers
            or others
          </li>
          <li>To protect or defend against attacks</li>
          <li>
            To enforce, remedy, or apply our Terms of Service or other
            agreements
          </li>
          <li>To prevent fraud, cybersecurity attacks or illegal activity</li>
        </UnorderedList>
      </Section>
      <Section>
        <Text size={4}>Changes to our Privacy Statements</Text>
        <GeneralText>
          From time to time we may change or update our Privacy Statement. We
          reserve the right to make changes or updates at any time. If we make
          material changes to the way we process your personal information, we
          will notify you by posting a notice in our platform or on a community
          post; by sending you a notification; or by other means consistent with
          applicable law.
          <br />
          <br />
          You can see when this Privacy Statement was last updated by checking
          the “last updated” date displayed at the top of this Privacy
          Statement. Please review this Privacy Statement periodically to stay
          informed about how Churnur protects your privacy.
        </GeneralText>
      </Section>
    </Wrapper>
  )
}
