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
var out = "";

const download = (path, filename) => {
    // Create a new link
    const anchor = document.createElement('a');
    anchor.href = path;
    anchor.download = filename;

    // Append to the DOM
    document.body.appendChild(anchor);

    // Trigger `click` event
    anchor.click();

    // Remove element from DOM
    document.body.removeChild(anchor);
};

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
                '[[b;white;]* cat]: Try it and see\n' +
                '[[b;white;]* source]: See source code on github [[i;yellow;]feel free to contribute and make this more cool!]\n' +
                '[[b;white;]* otg (mc version|website)]: Download our OpenTerrainGenerator fork for the latest MC versions, type [[b;white;]website] to visit their website.\n' +
                '[[b;white;]* baritone (mc version)]: Download our Baritone fork for the latest MC versions.\n' +
                '[[b;white;]* gehenna]: Check out Frank\'s sideproject, Gehenna\n' +
                '[[b;white;]* memes (conversation|weird)]: Visit our meme repository, conversation memes are useful for winning internet arguments, surreal memes are just weird and funny\n' +
                '[[b;white;]* thirtydollar]: Try it and see.';
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
            $.ajaxSetup({async: false});
            $.post("https://infotoast.org/aka/php/action_login.php", {
                un: username,
                pw: passwd
            }, function(data, status) {
                console.log(data);
                if (data.endsWith("success")) {
                    data = {
                        name: lname,
                        url: url
                    }
                    $.post("https://infotoast.org/aka/php/action_mklink.php", data, function(data, status) {
                        console.log(data);
                        if (data.endsWith("success")) {
                            out += "[[;green;]Link created successfully and available at] [[!;;;;https://infotoast.org/aka/" + lname + "]https://infotoast.org/aka/" + lname + "]";
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
            window.open("https://matrix.to/#/#info-toast:infotoast.ems.host", "_blank");
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
        },
        source: function() {
            window.location.replace("https://github.com/FrankTCA/InfoToastTerminal");
        },
        otg: function(version) {
            if (version.toString().startsWith("1.19")) {
                const anchor = document.createElement('a');
                anchor.href = "https://infotoast.org/aka/otg19";
                anchor.download = "OpenTerrainGenerator-Paper-1.19.jar";

                document.body.appendChild(anchor);
                anchor.click();
                this.echo("[[;green;]Downloaded!]");

                document.body.removeChild(anchor);
            } else if (version.toString() === "1.18.2") {
                download("https://infotoast.org/aka/otg18", "OpenTerrainGenerator-Paper-1.18.2-0.0.27.jar");
                this.echo("[[;green;]Downloaded!]");
            } else if (version.toString() === "1.16.5") {
                download("https://infotoast.org/aka/otg16", "OpenTerrainGenerator-1.16.5-0.1.10.jar");
                this.echo("[[;green;]Downloaded!]");
            } else if (version.toString() === "1.12.2") {
                download("https://infotoast.org/aka/otg12", "OpenTerrainGenerator-1.12.2-v9.4.jar");
            } else if (version.toString() === "website") {
                window.open("https://www.openterraingenerator.org", "_blank");
            } else {
                this.echo("[[;red;]Version either too old or too new.] [[i;yellow;]Are you typing version for example] [[b;white;]'1.19.2'][[i;yellow;]?]");
            }
        },
        baritone: function(version) {
            if (version.toString() === "1.18.2") {
                download("https://infotoast.org/Downloads/baritone-fabric-1.18.2.jar", "baritone-fabric-1.18.2.jar");
                this.echo("[[;green;]Downloaded!]");
            } else if (version.toString().startsWith("1.18")) {
                download("https://infotoast.org/Downloads/baritone-fabric-1.18.jar", "baritone-fabric-1.18.jar");
                this.echo("[[;green;]Downloaded!]");
            } else if (version.toString() === "1.19") {
                download("https://infotoast.org/Downloads/baritone-fabric-1.19.jar", "baritone-fabric-1.19.jar");
                this.echo("[[;green;]Downloaded!]");
            } else if (version.toString() === "1.19.1") {
                download("https://infotoast.org/Downloads/baritone-fabric-1.19.1.jar", "baritone-fabric-1.19.1.jar");
                this.echo("[[;green;]Downloaded!]");
            } else if (version.toString() === "1.19.2") {
                download("https://infotoast.org/Downloads/baritone-fabric-1.19.2.jar", "baritone-fabric-1.19.2.jar");
                this.echo("[[;green;]Downloaded!]");
            } else {
                this.echo("[[;red;]Version either too old or too new.] [[i;yellow;]Are you typing version for example] [[b;white;]'1.19.2'][[i;yellow;]?]");
            }
        },
        gehenna: function() {
            window.open("https://www.curseforge.com/minecraft/mc-mods/gehenna-super-spooky-nether-overhaul-for-forge", "_blank");
        },
        memes: function(arg) {
            if (arg.toString() === "weird") {
                window.open("https://github.com/FrankTCA/DiscordMemes/tree/weird", "_blank");
            } else if (arg.toString() === "conversation") {
                window.open("https://github.com/FrankTCA/DiscordMemes", "_blank");
            } else {
                this.echo("[[;red;]Argument invalid, use] [[b;white;]conversation] [[;red;]or] [[b;white;]surreal]");
            }
        },
        thirtydollar: function() {
            window.open("https://thirtydollar.website", "_blank");
        },
        update: function(passwd) {
            $.ajaxSetup({async: false});
            $.post("https://infotoast.org/terminal/php/action_update.php", {
                admpass: passwd
            }, function(data, status) {
                out += data;
            });
            this.echo(out);
            out = "";
        }
    }, {
        greetings: fullText,
        prompt: "[[b;red;]>>> ]"
    });
});