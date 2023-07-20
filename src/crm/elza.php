<?php

if (file_exists('../app/params.ini')) {
    $params = parse_ini_file('../app/params.ini');
} else {
    $params = [];
}

$token = $params['ELZA_TOKEN'];
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);
$dataLog = $input;
$input['token'] = $token;

echo send($input, $dataLog);

function send($data, $dataLog)
{
    $ch = curl_init();
    $curl_options = [];
    $url = 'https://integrations.goit.global/LeelooEsputnik/wh-s.php';
    $curl_options[CURLOPT_URL] = $url;
    $curl_options[CURLOPT_RETURNTRANSFER] = true;
    $curl_options[CURLOPT_HEADER] = 1;
    $curl_options[CURLOPT_CUSTOMREQUEST] = "POST";
    $curl_options[CURLOPT_POSTFIELDS] = json_encode($data);
    $headersArray = [];
    $headersArray[] = "Content-Type: application/json";
    $curl_options[CURLOPT_HTTPHEADER] = $headersArray;

    curl_setopt_array($ch, $curl_options);

    $response = curl_exec($ch);
    $header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
    $header = substr($response, 0, $header_size);
    $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $body = substr($response, $header_size);

    $log = [
        'input' => $dataLog,
        'response' => json_decode($body)
    ];
    if ($httpcode !== 200) {
        $msg = 'Error in progress at {date}';
    } else {
        $msg = 'Success send status';
    }

    logResponse($msg, $log);

    return $body ?? [];
}

function logResponse($msg, $response)
{
    $file = fopen('elza.log', 'a+');
    $date = date(DATE_RFC822);
    $string = [
        'message' => str_replace('{date}', $date, $msg),
        'data' => $response,
    ];
    fwrite($file, json_encode($string, JSON_UNESCAPED_UNICODE) . ",");
    fclose($file);
}