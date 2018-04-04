// by yarden sade
// ipinfo API demo
// V0.1
// The Main function gets IP address, sends request to ipinfo api, gets the relevant info and prints it in table format using markdown.

var queryIPInfo = function (ip) {
    // create full url out of ip
    var url = 'https://ipinfo.io/' + ip + '/json',
        xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    // once xhr is ready start anon func
    xhr.onreadystatechange = function () {
        var status = xhr.status;
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (status === 200) {
                var data = JSON.parse(xhr.response),
                    converter = new showdown.Converter(),
                    output_el = document.getElementById('targetP'),
                    coordinates = '',
                    latitude = '',
                    longitude = '',
                    html_output = '',
                    html = '';

                // get latitude and longitude out of the location param
                coordinates = data.loc;
                coordinates = coordinates.split(",");
                latitude = coordinates[0];
                longitude = coordinates[1];
                // create markdown & insert relevant data
                html_output = "||||||||\n" +
                    "|--------------|----------|---|-----------|---|------|---|\n" +
                    "| **Location** | Country | " + data.country + " | Region | " + data.region + " | City | " + data.city + " |\n" +
                    "| **Organization** <td colspan=6>" + data.org + " </td> |\n" +
                    "| **Coordinates**  <td colspan=2> Latitude | " + latitude + " <td colspan=2> Longitude | " + longitude + "  |";
                // convert markdown to html & enable tables markdown extension
                converter.setOption('tables', true);
                html = converter.makeHtml(html_output);
                // print html to DOM - for testing purposes only
                output_el.innerHTML = html;

                return html;

            } else {
                // bad answer from api.
                alert('Something went wrong: ' + status);
            }
        }
    };
    xhr.send();

};

var ip = '8.8.8.8';
var html = queryIPInfo(ip);
