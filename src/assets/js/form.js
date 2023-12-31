/**
 * Form.js - v1.2.0
 * Created @Suzuya_re1 at 2022-10-01
 * Updated @Dizardmk
 */

import $ from 'jquery';
import intlTelInput from 'intl-tel-input';
import JustValidate from 'just-validate';
import service from './service.js';
import crm from './submit.js';

$(window).on('load', async function () {
  /*  Украина(uk), Польша(pl), Мексика-Колумбия(es), Филиппины(en), Румыния(ro) */
  let defaultLang = null;

  switch (window.locale) {
    case 'pl':
      defaultLang = 'pl';
      break;
    case 'es':
      defaultLang = 'es';
      break;
    case 'en':
      defaultLang = 'en';
      break;
    case 'ro':
      defaultLang = 'ro';
      break;
    default:
      defaultLang = 'uk';
  }

  /* Украина(ua), Польша(pl), Мексика(mx), Колумбия(co), Филиппины(ph), Румыния(ro) */
  let itiLocale = null;

  switch (window.locale) {
    case 'pl':
      itiLocale = 'pl';
      break;
    case 'es':
      itiLocale = 'co';
      break;
    case 'en':
      itiLocale = 'ph';
      break;
    case 'ro':
      itiLocale = 'ro';
      break;
    default:
      itiLocale = 'ua';
  }

  // Params
  const params = {
    needsRedirectToLeeloo: window.leelooHash ? true : false,
    needsRedirectToTelegramBackend: window.telegramBackendUrl ? true : false,

    /* It's a check that the domain has MX records on dns server */
    needsCheckEmailDomain: true,

    utmMarks: ['utm_source', 'utm_medium', 'utm_content', 'utm_term', 'utm_campaign'],
    referralMarks: ['SRC', 'from'],
    defaultLocale: defaultLang,
    defaultPhoneCountry: itiLocale,
    preferredPhoneCountries: [itiLocale],
    excludePhoneCountries: ['ru', 'by'],

    forms: [
      {
        formId: 'modalForm',
      },
      // {
      // formId: 'yourFormId',
      // productName: 'yourProductName',
      // productId: 'yourProductId',
      //
      // Required params if you need send email
      //
      // needSendEmail: true,
      // onlySendEmail: true,
      // emailTitle: 'Email title',
      // emailRecipient: 'hr@goit.global',
      // },
    ],
  };

  /* It's a check that the locale is set. If not, it sets the default locale. */
  if (!window.locale) {
    console.log('Locale is not set, setting default locale: ' + params.defaultLocale);
    window.locale = params.defaultLocale;
  }

  /* It's a check that you can use only one of the following methods: redirect to leeloo or redirect to
telegram backend. */
  if (params.needsRedirectToLeeloo && params.needsRedirectToTelegramBackend) {
    throw new Error(
      'You can use only one of the following methods: redirect to leeloo or redirect to telegram backend'
    );
  }

  /* It's a function that gets the user's IP address. */
  await service.getIpInfo().then(data => (window.ipData = data));

  /* It's a function that gets the country code from the user's IP address. */
  await service
    .geoIpLookup(params.defaultPhoneCountry)
    .then(country_code => (window.itiInitialCountry = country_code));

  /* It's a function that saves the UTM marks to cookies. */
  service.saveParamsToCookies(params.utmMarks);

  /* It's a function that saves the referral marks to cookies. */
  params.telegramBackendUrl && service.saveParamsToCookies(params.referralMarks);

  /* It's a function that takes an array of forms and validates them. */
  Promise.all(params.forms.map(async form => await formHandler(form)));

  /**
   * It's a function that initializes the form
   * @param formParams - form params
   */
  async function formHandler(formParams) {
    const {
      formId,
      productName = window.productName,
      productId = window.productId,
      needSendEmail = false,
      onlySendEmail = false,
      emailTitle = 'New request',
      emailRecipient = 'info@goit.ua',
    } = formParams;

    // Refs
    const form = document.getElementById(formId);

    if (!form) {
      throw new Error(`Form with id ${formId} not found`);
    }

    const name = form.querySelector('[name="name"]');
    const phone = form.querySelector('[type="tel"]');
    const email = form.querySelector('[name="email"]');

    // Vars
    const iti = intlTelInput(
      phone,
      await service.getItiConfig(params.preferredPhoneCountries, params.excludePhoneCountries)
    );

    /* It's a function that initializes the validation library. */
    const validationForm = new JustValidate(
      form,
      service.validationOptions,
      service.getValidationLocale()
    );

    validationForm.setCurrentLocale(window.locale);

    // apply rules to form fields
    service
      .setFormValidation(validationForm)
      .addField(`#${phone.id}`, [
        {
          validator: value =>
            iti.isValidNumber() && service.isNumeric(value) && !value.includes('.'),
          errorMessage: 'Phone number is invalid!',
        },
      ])
      // submit form
      .onSuccess(async function (event) {
        event.preventDefault();

        /* Adds "disabled" attribute to button with type submit. */
        service.addDisabledAttributeToSubmitBtn();

        /* It's a check that the email domain has MX records on dns server. */
        if (params.needsCheckEmailDomain && !(await service.checkEmailDomain(email.value))) {
          return service.showError(service.translate('emailNotExists'));
        }

        /* It's a function that removes extra spaces */
        name.value = name.value.trim();

        /* It's a function that gets the phone number from the input field. */
        const phoneNumber = iti.getNumber();

        /* It's a function that gets the form data from the form and adds the fields emailTitle and emailRecipient */
        const formData = new FormData(form);
        formData.append('emailTitle', emailTitle);
        formData.append('emailRecipient', emailRecipient);

        const loading = new service.Loading(form, service.translate('loadingMessage'));
        $(form).css('display', 'none');
        loading.show();

        if (needSendEmail) {
          await service
            .sendEmail(formData)
            .then(res => {
              /* It's a check that the form is only for sending an email.
              If so, it hides the loading block and shows the success block. */
              if (onlySendEmail) {
                service.showSuccess();
              }
            })
            .catch(error => {
              console.log(error);
              service.showError();
            })
            .finally(() => {
              if (onlySendEmail) {
                service.changeFormStep(form, 3);
                loading.hide();
              }
            });
        }

        if (!onlySendEmail) {
          const crmParams = [name.value, phoneNumber, email.value, productName, productId];

          /* It's a function that generates data for the CRM. */
          const data = crm.generateData(...crmParams);
          /* It's a function that sends data to the CRM. */
          const response = crm.submit(...crmParams);

          /* It's a Google Tag Manager event. */
          dataLayer.push({
            event: 'lead',
            phone: phoneNumber,
            email: email.value,
            conversionId: service.uid(),
          });

          // https://www.youtube.com/watch?v=sqcLjcSloXs

          service.changeFormStep(form, 2);

          switch (true) {
            case params.needsRedirectToLeeloo:
              return showLeelooBlock();

            case params.needsRedirectToTelegramBackend:
              return showTelegramBackendBlock();

            default:
              return showDefaultBlock();
          }

          /* It's a function that redirects the user to the Leeloo CRM. */
          async function showLeelooBlock() {
            service.setParamsForLeeloo(data);

            try {
              const resp = await response;

              if (resp.status === 200) {
                service.setUrlParameter('name2', name.value);

                if (window.elzaToken) {
                  const elzaId = await service.sendDataToIntelza(phoneNumber);
                  service.setUrlParameter('elza_id', elzaId);
                }

                service.initializeLeeloo(form);
                $(form).css('display', 'none');
                $(form).trigger('reset');
                service.changeFormStep(form, 3);

                const checkLeeloo = setInterval(() => {
                  const iframe = form.querySelector('.leeloo-lgt-form');
                  if (iframe) {
                    clearInterval(checkLeeloo);
                    dataLayer.push({ event: 'появилось окно с кнопкой' });
                  }
                }, 2000);
              } else {
                console.log('error ', resp.statusText);
                $(form).css('display', 'block');
                service.showError();
              }
            } catch (error) {
              console.log(error);
              $(form).css('display', 'block');
              service.showError();
            } finally {
              loading.hide();
            }
          }

          /* It's a function that redirects the user to the Telegram backend. */
          async function showTelegramBackendBlock() {
            response.finally(async () => {
              await service.redirectToTelegramBackend(form, data).finally(() => {
                service.changeFormStep(form, 3);
                loading.hide();
              });
            });
          }

          async function showDefaultBlock() {
            response
              .then(resp => {
                if (resp.status === 200) {
                  $(form).trigger('reset');
                  service.changeFormStep(form, 3);
                  service.showSuccess(service.translate('reply'), true, loading, true);

                  /* That redirects user to some URL after send form. */
                  // window.location.href = 'someURL';
                } else {
                  console.log('error ', resp.statusText);
                  $(form).css('display', 'block');
                  service.showError();
                }
              })
              .catch(err => {
                console.log(err);
                $(form).css('display', 'block');
                service.showError();
                loading.hide();
              });
          }
        }
      });
  }
});
