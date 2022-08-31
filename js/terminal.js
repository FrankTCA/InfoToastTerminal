let ascii = "                                                      ,----,                                          \n" +
    "                                                    ,/   .`|                                          \n" +
    "   ,---,                                          ,`   .'  :                                  ___     \n" +
    ",`--.' |              .--.,                     ;    ;     /                                ,--.'|_   \n" +
    "|   :  :      ,---, ,--.'  \\   ,---.          .'___,/    ,'  ,---.                          |  | :,'  \n" +
    ":   |  '  ,-+-. /  ||  | /\\/  '   ,'\\         |    :     |  '   ,'\\               .--.--.   :  : ' :  \n" +
    "|   :  | ,--.'|'   |:  : :   /   /   |        ;    |.';  ; /   /   |  ,--.--.    /  /    '.;__,'  /   \n" +
    "'   '  ;|   |  ,\"' |:  | |-,.   ; ,. :        `----'  |  |.   ; ,. : /       \\  |  :  /`./|  |   |    \n" +
    "|   |  ||   | /  | ||  : :/|'   | |: :            '   :  ;'   | |: :.--.  .-. | |  :  ;_  :__,'| :    \n" +
    "'   :  ;|   | |  | ||  |  .''   | .; :            |   |  ''   | .; : \\__\\/: . .  \\  \\    `. '  : |__  \n" +
    "|   |  '|   | |  |/ '  : '  |   :    |            '   :  ||   :    | ,\" .--.; |   `----.   \\|  | '.'| \n" +
    "'   :  ||   | |--'  |  | |   \\   \\  /             ;   |.'  \\   \\  / /  /  ,.  |  /  /`--'  /;  :    ; \n" +
    ";   |.' |   |/      |  : \\    `----'              '---'     `----' ;  :   .'   \\'--'.     / |  ,   /  \n" +
    "'---'   '---'       |  |,'                                         |  ,     .-./  `--'---'   ---`-'   \n" +
    "                    `--'                                            `--`---'                        ";
let fullAscii = "[[;cyan;]" + ascii + "]";
let fullText = fullAscii + "\n[[;yellow;]Welcome to the Info Toast Terminal!]\n" +
    "[[;bold;]* [[;yellow;]Type] [[;white;][[;bold;]help]][[;yellow;] for a list of available commands.]\n" +
    "[[;bold;]*] [[;yellow;]Type] [[;white;][[;bold;]home]][[;yellow;] to return to the info toast homepage.\n"
let out = "";

let term = $(function() {
    $('body').terminal({
        home: function() {
            window.location.replace("https://infotoast.org/site/");
        },
        help: function() {
            let helptxt = '[[b;blue;]Help manual:]\n' +
                '[[b;white;]* home]: Go to info toast homepage.\n' +
                '[[b;white;]* help]: Shows this menu.\n' +
                '[[b;white;]* close]: Closes this tab.\n' +
                '[[b;white;]* aka (username) (link name) (url) (password)]: Creates shortened links using Info Toast AKA\n' +
                '[[b;white;]* discord]: Go to info toast discord.\n' +
                '[[b;white;]* matrix]: Register with info toast Matrix [[i;yellow;]recommended over discord]\n' +
                '[[b;white;]* cat]: Try it and see';
            this.echo(helptxt);
        },
        close: function() {
            window.close();
        },
        // Needs fixing on main server
        aka: function(username, lname, url, passwd) {
            this.echo('[[b;yellow;] This requires prior registation and approval to use the aka platform.]\n' +
                'If unregistered, register [[!;;;;https://infotoast.org/aka/register.php]here]\n' +
                'The GUI version of this can be accessed at: [[!;;;;https://infotoast.org/aka/]Info Toast AKA]');
            $.post("https://infotoast.org/aka/php/action_login.php", {
                un: username,
                pw: passwd
            }, function(data, status) {
                if (data.endsWith("success")) {
                    data = {
                        lname,
                        url
                    }
                    $.post("https://infotoast.org/aka/php/action_mklink.php", data, function(data, status) {
                        if (data.endsWith("success")) {
                            out += "[[;green;]Link created successfully and available at] [[!;;;;https://infotoast.org/aka/" + url + "]https://infotoast.org/aka/" + url + "]";
                        } else {
                            out += "[[;red;]Did not work!]\n";
                            out += data;
                        }
                    });
                } else {
                    out += "[[;red;]Username or password invalid!]\n";
                    out += data;
                }
            });
            this.echo(out);
            out = "";
        },
        discord: function() {
            window.location.replace("https://discord.gg/infotoast");
        },
        matrix: function() {
            window.location.replace("https://infotoast.element.io");
        },
        cat: function() {
            let cat = "**********************************************************\n" +
                "\n" +
                "                     IM IN YUR COMPUTERZ...\n" +
                "\n" +
                "               .__....._             _.....__,\n" +
                "                 .\": o :':         ;': o :\".\n" +
                "                 `. `-' .'.       .'. `-' .'   \n" +
                "                   `---'             `---'  \n" +
                "\n" +
                "         _...----...      ...   ...      ...----..._\n" +
                "      .-'__..-\"\"'----    `.  `\"`  .'    ----'\"\"-..__`-.\n" +
                "     '.-'   _.--\"\"\"'       `-._.-'       '\"\"\"--._   `-.`\n" +
                "     '  .-\"'                  :                  `\"-.  `\n" +
                "       '   `.              _.'\"'._              .'   `\n" +
                "             `.       ,.-'\"       \"'-.,       .'\n" +
                "               `.                           .'\n" +
                "          jgs    `-._                   _.-'\n" +
                "                     `\"'--...___...--'\"`\n" +
                "\n" +
                "                     WATCHIN YUR SCREENZ        \n" +
                "\n" +
                "**********************************************************";
            this.echo(cat);
        }
    }, {
        greetings: fullText,
        prompt: "[[b;red;]>>> ]"
    });
});