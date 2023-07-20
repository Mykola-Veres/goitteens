<?php

use components\Params;
require_once 'vendor/autoload.php';

/* It loads the .env file */
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

if (!empty($_POST)) {
    $saver = new Params();
    $saver->save();
}

$ini_array = parse_ini_file('params.ini');
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./style.css" />
    <title>Params</title>
  </head>
  <body>
    <form action="" method="post">
      <label>
        Zoho Product Name
        <input
          type="text"
          name="PRODUCT_NAME"
          value="<?= $ini_array['PRODUCT_NAME'] ?>"
          placeholder="<?= $ini_array['PRODUCT_NAME'] ?>"
        />
      </label>

      <label>
        Zoho Product ID
        <input
          type="text"
          name="PRODUCT_ID"
          value="<?= $ini_array['PRODUCT_ID'] ?>"
          placeholder="<?= $ini_array['PRODUCT_ID'] ?>"
        />
      </label>

      <div style="display: flex; flex-direction: row; gap: 20px">
        <label style="width: 50%">
          Leeloo Hash
          <input
            type="text"
            name="LEELOO_HASH"
            value="<?= $ini_array['LEELOO_HASH'] ?>"
            placeholder="<?= $ini_array['LEELOO_HASH'] ?>"
          />
        </label>

        <label style="width: 50%">
          Elza Token
          <input
            type="text"
            name="ELZA_TOKEN"
            value="<?= $ini_array['ELZA_TOKEN'] ?>"
            placeholder="<?= $ini_array['ELZA_TOKEN'] ?>"
          />
        </label>
      </div>

      <!-- <label>
        Telegram Backend URL
        <input
          type="text"
          name="TELEGRAM_BACKEND_URL"
          value="<?= $ini_array['TELEGRAM_BACKEND_URL'] ?>"
          placeholder="<?= $ini_array['TELEGRAM_BACKEND_URL'] ?>"
        />
      </label> -->

      <!-- <label>
        Telegram Bot
        <input
          type="text"
          name="TELEGRAM_BOT"
          value="<?= $ini_array['TELEGRAM_BOT'] ?>"
          placeholder="<?= $ini_array['TELEGRAM_BOT'] ?>"
        />
      </label> -->

      <!-- <label>
        CAPI Lead Format
        <input
          type="text"
          name="CAPI_LEAD_FORMAT"
          value="<?= $ini_array['CAPI_LEAD_FORMAT'] ?>"
          placeholder="<?= $ini_array['CAPI_LEAD_FORMAT'] ?>"
        />
      </label> -->

      <label>
        GTM
        <input
          type="text"
          name="GTM"
          value="<?= $ini_array['GTM'] ?>"
          placeholder="<?= $ini_array['GTM'] ?>"
        />
      </label>

      <!-- <label>
        Start Date
        <input
          type="text"
          name="START_DATE"
          value="<?= $ini_array['START_DATE'] ?>"
          placeholder="<?= $ini_array['START_DATE'] ?>"
        />
      </label> -->

      <!-- <label>
        Start Day
        <input
          type="number"
          name="START_DAY"
          value="<?= $ini_array['START_DAY'] ?>"
          placeholder="<?= $ini_array['START_DAY'] ?>"
        />
      </label> -->

      <!-- <label>
        Start Month
        <input
          type="month"
          name="START_MONTH"
          value="<?= $ini_array['START_MONTH'] ?>"
          placeholder="<?= $ini_array['START_MONTH'] ?>"
        />
      </label> -->

      <!-- <label>
        Start Time
        <input
          type="time"
          name="START_TIME"
          value="<?= $ini_array['START_TIME'] ?>"
          placeholder="<?= $ini_array['START_TIME'] ?>"
        />
      </label> -->

      <label>
        Password
        <input type="password" name="password" />
      </label>

      <button type="submit">Save</button>
    </form>
  </body>
</html>