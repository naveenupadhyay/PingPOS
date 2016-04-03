(function (requirejs, require, define){(function() {
  var $, AVAILABILITY_POLLING_INTERVAL, LABEL_MAP, agentAvailabilityPoll, anticipate, defaultActions, getParameterByName;

  $ = CID.amd.require('jquery');

  anticipate = function(options, tries) {
    var attempts, condition, fail, interval, progress, success;
    if (tries == null) {
      tries = 0;
    }
    condition = options.condition, progress = options.progress, fail = options.fail, success = options.success, interval = options.interval, attempts = options.attempts;
    if (++tries >= attempts) {
      return fail();
    }
    if (condition()) {
      return success();
    } else {
      progress(tries);
      return setTimeout(function() {
        return anticipate(options, tries);
      }, interval);
    }
  };

  LABEL_MAP = {
    'Haier': 'haier',
    'Seagate': 'seagate',
    'Dyson': 'dyson',
    'Samsung': 'samsung',
    'LG': 'lg',
    'HP': 'hp',
    'Dell': 'dell',
    'Electrolux': 'electrolux',
    'Arm & Hammer': 'armhammer',
    'Eureka': 'eureka',
    'Frigidaire': 'frigidaire',
    'Lenovo': 'lenovo',
    'Magic Chef': 'magicchef',
    'Mongoose': 'mongoose',
    'Schwinn': 'schwinn',
    'Kid Trax': 'kidtrax',
    'Roadmaster': 'roadmaster',
    'AT&T': 'att',
    'Netgear': 'netgear',
    'Verizon': 'verizon',
    'Bissell': 'bissell',
    'Nintendo': 'nintendo',
    'Vega': 'vega'
  };

  AVAILABILITY_POLLING_INTERVAL = 30 * 1000;

  agentAvailabilityPoll = function() {
    return anticipate({
      condition: function() {
        return $("#chatid-brand-label").length;
      },
      progress: function(tries) {
        return CID.chatbar.debug("looking for cta (attempt " + tries + ")");
      },
      fail: function() {
        return CID.chatbar.debug("could not find cta");
      },
      success: function() {
        var chatidTmp, check;
        if ((chatidTmp = LABEL_MAP[$("#chatid-brand-label").data('brand-label')])) {
          return check = setInterval(function() {
            var _this = this;
            return $.getJSON("https://directory.chatid.com/chatids?channel=walmart&name=" + chatidTmp, null, function(data) {
              var _ref, _ref1, _ref2;
              if (!((_ref = data[chatidTmp]) != null ? (_ref1 = _ref.routes) != null ? (_ref2 = _ref1["default"]) != null ? _ref2.available : void 0 : void 0 : void 0)) {
                CID.chatbar.debug('not available');
                $('.cid-cta-wrapper').html('');
                CID('scribe.record', 'cta_hide');
                return clearInterval(check);
              }
            });
          }, AVAILABILITY_POLLING_INTERVAL);
        }
      },
      interval: 1000,
      attempts: 1000
    });
  };

  getParameterByName = function(name) {
    var match;
    match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  };

  defaultActions = function(chatid) {
    return [
      {
        id: 'walmart-action001',
        options: {
          target: chatid
        }
      }, {
        id: 'walmart-action002',
        options: {
          target: chatid
        }
      }
    ];
  };

  define('channel',[],function() {
    var beaconPixels, brandSplashSideCTA, customCss, e, pdpCTA001, pdpCTARibbon;
    customCss = "#chatid-cta-pdp,\n#chatid-cta-splash {\n  font-size: 14px;\n  overflow: hidden;\n  margin-top: 10px;\n}\n#chatid-cta-pdp img,\n#chatid-cta-pdp-ribbon img {\n  display: inline-block;\n  vertical-align: middle;\n  margin-right: 0.3em;\n  margin-top: -2px;\n}\n#chatid-cta-pdp .cta-prompt {\n  margin-top: 4px;\n}\n#chatid-cta-pdp .btn {\n  height: 30px;\n  font-size: 14px;\n  padding: 0 10px;\n  line-height: 30px;\n  font-weight: 600;\n}\n#chatid-cta-pdp-ribbon {\n  cursor: pointer;\n  background: #007dc6 !important;\n}\n.cidf-hide {\n  background: transparent !important;\n}\n#chatid-cta-pdp-ribbon img {\n  width: 12px;\n  height: 12px;\n}\n.chatid-splash-cta {\n  margin: 0;\n  padding: 0;\n  border-right: 0;\n  border-radius: 5px 0 0 5px;\n  box-shadow: 0 2px 4px rgba(0, 31, 55, 0.15);\n  font-family: Arial;\n  position: fixed;\n  background-color: white;\n  box-sizing: border-box;\n  overflow: visible;\n}\n#chatid-cta-splash-side {\n  font-family: myriad-pro, 'Helvetica Neue', Helvetica, Arial, sans-serif;\n  width: 302px;\n  height: 70px;\n  right: -212px;\n  top: 60%;\n  z-index: 8000;\n  -webkit-transition: right 0.5s ease;\n  -o-transition: right 0.5s ease;\n  transition: right 0.5s ease;\n  -webkit-border-top-left-radius: 5px;\n  -webkit-border-bottom-left-radius: 5px;\n  -moz-border-radius-topleft: 5px;\n  -moz-border-radius-bottomleft: 5px;\n  border-top-left-radius: 5px;\n  border-bottom-left-radius: 5px;\n}\n#chatid-cta-splash-side:hover {\n  right: -5px;\n}\n.chatid-splash-cta button {\n  height: 100%;\n  width: 100%;\n  padding: 0;\n  margin: 0;\n  border: 0;\n  overflow: visible;\n  background-color: white;\n  -webkit-border-top-left-radius: 7px;\n  -webkit-border-bottom-left-radius: 7px;\n  -moz-border-radius-topleft: 7px;\n  -moz-border-radius-bottomleft: 7px;\n  border-top-left-radius: 7px;\n  border-bottom-left-radius: 7px;\n}\n.chatid-avatar-img img {\n  height: 60px;\n  width: 60px;\n  border-radius: 31px;\n  display: block;\n  margin: 0 auto;\n  box-shadow: 0 2px 4px rgba(0, 31, 55, 0.15);\n  position: relative;\n}\n#chatid-cta-splash-side .chatid-avatar-img {\n  margin-top: -25px;\n  margin-right: -2px;\n}\n.chatid-cta-avatar-container {\n  width: 30%;\n  float: left;\n  height: 100%;\n  text-align: center;\n  background-color: #cecece;\n  background-image: linear-gradient(to bottom,#d9d9d9,#cecece);\n  color: #444;\n  font-weight: 900;\n  position: relative;\n  -webkit-border-top-left-radius: 5px;\n  -webkit-border-bottom-left-radius: 5px;\n  -moz-border-radius-topleft: 5px;\n  -moz-border-radius-bottomleft: 5px;\n  border-top-left-radius: 5px;\n  border-bottom-left-radius: 5px;\n}\n.chatid-cta-prompt {\n  font-size: 14px;\n  text-align: center;\n  padding-top: 8px;\n}\n.chatid-cta-detail-container {\n  width: 69%;\n  height: 100%;\n  float: left;\n  text-align: left;\n  background-color: #eee;\n}\n#chatid-cta-splash-side .chatid-cta-detail {\n  margin: 15px 10px;\n}\n.chatid-cta-detail .chatid-header {\n  font-size: 21px;\n  font-weight: 700;\n  line-height: 14px;\n}\n.chatid-cta-detail .chatid-subhead {\n  padding: 0;\n  font-weight: 400;\n  font-size: 16px;\n  line-height: 16px;\n  margin-top: 10px;\n}\n.price-flags {\n  position: relative;\n  z-index: 2;\n}\n.lt-ie9 #chatid-cta-pdp .btn {\n  padding-left: 30px;\n}\n.lt-ie9 #chatid-cta-pdp img {\n  margin-left: -20px;\n}\n.lt-ie9 #chatid-cta-pdp-ribbon {\n  padding-left: 26px;\n}\n.lt-ie9 #chatid-cta-pdp-ribbon img {\n  margin-left: -16px;\n}";
    pdpCTA001 = "<div class='cid-cta-wrapper'>\n  <span class='cta-prompt pull-left'>\n    Have questions about this product?\n    <% if (this.label.length < 10) { print(\"Get certified assistance.\"); } %>\n  </span>\n  <button class='btn pull-right' data-ref='button'>\n    <img src='https://chatidcdn.com/assets/generic/icon-bubble-white.png' />\n    Chat with <%= this.label %>\n  </button>\n  <div id='chatid-brand-label' data-brand-label='<%= this.label %>'></div>\n</div>";
    pdpCTARibbon = "<div class='cid-cta-wrapper'>\n  <span class='js-price-flag flag flag-alt'>\n    <span data-ref='button'>\n      <img src='https://chatidcdn.com/assets/generic/icon-bubble-white.png' />\n      Chat Available\n    </span>\n  </span>\n</div>";
    brandSplashSideCTA = "<div class='cid-cta-wrapper'>\n  <div id=\"chatid-cta-splash-side\" class=\"chatid-splash-cta\">\n    <button data-ref=\"button\">\n      <div class=\"chatid-cta-avatar-container\">\n        <div class=\"chatid-avatar-img\">\n          <img src=\"<%= this.image %>\" alt=\"<%= this.label %> Logo\">\n        </div>\n        <div class=\"chatid-cta-prompt\">LIVE CHAT</div>\n      </div>\n      <div class=\"chatid-cta-detail-container\">\n        <div class=\"chatid-cta-detail\">\n          <div class=\"chatid-header\">\n            Have a Question?\n          </div>\n          <div class=\"chatid-subhead\">\n            Chat with <%= this.label %>\n          </div>\n        </div>\n      </div>\n    </button>\n  </div>\n  <div id='chatid-brand-label' data-brand-label='<%= this.label %>'></div>\n</div>";
    e = encodeURIComponent;
    beaconPixels = {
      'samsung': function(csid) {
        return "<img src=\"" + location.protocol + "//beacon.walmart.com/vm/ttap.gif?id=10694189&brand=Samsung&chatidid=" + (e(csid)) + "\" width=\"1\" height=\"1\" style=\"position:absolute\"/>";
      },
      'dyson': function(csid) {
        return "<img src=\"" + location.protocol + "//beacon.walmart.com/vm/ttap.gif?id=10694190&brand=Dyson&chatidid=" + (e(csid)) + "\" width=\"1\" height=\"1\" style=\"position:absolute\"/>";
      },
      'southshorefurniture': function(csid) {
        return "<img src=\"" + location.protocol + "//beacon.walmart.com/vm/ttap.gif?id=10694195&brand=South%20Shore%20Furniture&chatidid=" + (e(csid)) + "\" width=\"1\" height=\"1\" style=\"position:absolute\"/>";
      },
      'impression': function(itemId, csid) {
        return "<img src=\"" + location.protocol + "//beacon.walmart.com/chat-widget.gif?async=1&itemId=" + (e(itemId)) + "&chatId=" + (e(csid)) + "&u=chatAvailableShown&r=" + (e(location.href)) + "\" width=\"1\" height=\"1\" style=\"position:absolute\" />";
      },
      'interaction': function(itemId, csid) {
        return "<img src=\"" + location.protocol + "//beacon.walmart.com/chat-widget.gif?async=1&itemId=" + (e(itemId)) + "&chatId=" + (e(csid)) + "&u=chatAvailableInteracted&r=" + (e(location.href)) + "\" width=\"1\" height=\"1\" style=\"position:absolute\" />";
      }
    };
    return {
      config: {
        CHANNEL_CTAS: [
          {
            id: 'walmart-cta001',
            description: "Blue button below product title and ratings",
            type: 'reactive',
            design: 'button',
            options: {
              container: '#chatid-cta-pdp',
              template: pdpCTA001
            }
          }, {
            id: 'walmart-cta002',
            description: "Blue ribbon in ribbon area next to price",
            type: 'reactive',
            design: 'button',
            options: {
              container: '#chatid-cta-pdp-ribbon',
              template: pdpCTARibbon
            }
          }, {
            id: 'walmart-cta003',
            description: "Splash page CTA in header - Disabled"
          }, {
            id: 'walmart-cta004',
            description: "Splash page CTA in products list - Disabled"
          }, {
            id: 'walmart-cta005',
            description: "Splash page CTA fixed to side",
            type: 'reactive',
            design: 'button',
            options: {
              container: '#chatid-cta-splash-side-container',
              template: brandSplashSideCTA
            }
          }, {
            id: 'walmart-cta999',
            description: "IT'S CTA999!!!",
            type: 'reactive',
            design: 'button',
            options: {
              container: '#chatid-cta-pdp',
              template: ""
            }
          }
        ],
        CHANNEL_ACTIONS: [
          {
            id: 'walmart-action001',
            description: "primary pdp cta",
            method: 'ctas.insert',
            options: {
              cta_id: 'walmart-cta001'
            }
          }, {
            id: 'walmart-action002',
            description: "ribbon pdp cta",
            method: 'ctas.insert',
            options: {
              cta_id: 'walmart-cta002'
            }
          }, {
            id: 'walmart-action003',
            description: "splash page cta on side of page",
            method: 'ctas.insert',
            options: {
              cta_id: 'walmart-cta005'
            }
          }
        ],
        CHANNEL_CAMPAIGNS: [
          {
            id: 'walmart-campaign001',
            description: "samsung pdp chat",
            target: {
              pdp: {
                brand: {
                  whitelist: 'Samsung'
                },
                tags: {
                  whitelist: 'Electronics,Audio,Stereos,Speaker Systems|Electronics,Audio,Stereos,Stereo Shelf Systems|Electronics,Audio,Stereos,Receivers & Amplifiers|Electronics,Electrónica,TV & Video,Vídeo y la Televisión,TVs,Televisores|Electronics,Elektronik,TV & Video,TV & Video,TVs,TVs|Electronics,Elektronika,TV & Video,Telewizja i wideo,TVs,Telewizory|Electronics,Home Audio & Theater,Home Theater Systems|Electrónica,Inicio Audio y Teatro,Sistemas de cine en casa|Electronics,TV & Video,TVs|Electronics,TV & Video,DVD & Blu-ray Players|Electronics,TV & Video,TV Accessories,TV Accessories|Electronics,TV & Video,Big Screen TVs WOW Gifts|Electronics,TV & Video,TV Accessories,Digital TV Converters|Electronics,TV & Video,Media Streaming Players|Electronics,TV & Video,TV Accessories,TV Mounts|Elektronik,TV & Video,TV\'ler|Électronique,TV & Vidéo,Téléviseurs|Electronics588,TV & Video589,TVs590|Electronics616,TV & Video617,TVs618|Electronics684,TV & Video685,DVD & Blu-ray Players686|Electronics698,TV & Video699,DVD & Blu-ray Players700|전자 공학,TV & 비디오,TV를|Eletrônica,TV e Vídeo,TVs|Electrónica,Vídeo y la Televisión,Televisores|Electrónica,Vídeo y la Televisión,Reproductores de DVD y Blu-ray|إلكترونيات,أجهزة الكمبيوتر,أجهزة الكمبيوتر اللوحية|Tablet PC|TV|Television'
                }
              }
            },
            actions: defaultActions('samsung')
          }, {
            id: 'walmart-campaign002',
            description: "dyson pdp chat",
            target: {
              pdp: {
                brand: {
                  whitelist: 'Dyson'
                }
              }
            },
            actions: defaultActions('dyson')
          }, {
            id: 'walmart-campaign003',
            description: "southshore pdp chat"
          }, {
            id: 'walmart-campaign004',
            description: "monster pdp chat"
          }, {
            id: 'walmart-campaign005',
            description: "Intel pdp chat"
          }, {
            id: 'walmart-campaign006',
            description: "hp pdp chat",
            target: {
              pdp: {
                brand: {
                  whitelist: '^HP$'
                },
                tags: {
                  whitelist: 'Printers|Desktop Computers|Laptop',
                  blacklist: 'Accessories'
                },
                name: {
                  blacklist: 'Refurbish'
                }
              }
            },
            actions: defaultActions('hp')
          }, {
            id: 'walmart-campaign007',
            description: "dell pdp chat",
            target: {
              pdp: {
                brand: {
                  whitelist: '^Dell$'
                },
                name: {
                  blacklist: 'Refurbish'
                }
              }
            },
            actions: defaultActions('dell')
          }, {
            id: 'walmart-campaign008',
            description: "Electrolux pdp chat",
            target: {
              pdp: {
                name: {
                  whitelist: 'Electrolux'
                },
                model: {
                  whitelist: "FPSC07K5NS|FPTT02D7MS|FPTT04D7MS|FPDC12D7MS|FPTC10D7NS|FPKT58D7NS|FPJB56B7MS|FPPG12K7MS|FPCO06D7MS|EL4650A|EL4305AZ|EL4300B|EL4040A|EL4071A|EL3000A|EL1030A|EL1022A|EL1010A|EL1064A|EL1014A|EL500AZ|ELAP15D7PW|ELAP45D8PW|AS3401A|955A|AS3101A|8711AZ|AS1101B|4870MZ|3500AE|AS1061A|AS1051A|AS1041A|990A|AS3011A|1934B|3684F|AS3001A|439AZ|AS2011A|3670G|AS2000A|80A|41A|71B|313A|30A|AS100B|169D|66699A\-4|69900A\-4|69944\-4|69955A\-4|63034|63006|63025|63027|63028|63029|68306|63030|63031|63032|63035|64521|64522|64523|64526|64524|64525|68303|68304|68305|68307|62630F\-2|62647F\-2|62632F\-4|62963F\-2|62636D\-2|66643F\-2|64221D\-2|69116D\-4|62640F\-2|62637F\-2|62653F\-2|64912\-2|68990|68991|68992|69996|EL023|EL024|62607\-6|62609\-6|62645D\-2|62461|62642D\-4|AS2003PAB|AS2003FUF|4703F|4704RES|AS2001FUF|AS2001TIS|AS2002PMA|AS2002TLU|150A|470AZ|4773AZ|96JZ|5403A|R4870K|431DX|5400A|3281AZ|3276BVZ|AS1049A|AS1000A|AS1050A|AS1055AX|EL1000B|EL1019A|EL2003A|EL8501AZ|EL8502F|EL4101A|EL8602A|EL4042A"
                }
              }
            },
            actions: defaultActions('electrolux')
          }, {
            id: 'walmart-campaign009',
            description: "Arm & Hammer pdp chat",
            target: {
              pdp: {
                name: {
                  whitelist: 'Arm & Hammer'
                },
                model: {
                  whitelist: "FPSC07K5NS|FPTT02D7MS|FPTT04D7MS|FPDC12D7MS|FPTC10D7NS|FPKT58D7NS|FPJB56B7MS|FPPG12K7MS|FPCO06D7MS|EL4650A|EL4305AZ|EL4300B|EL4040A|EL4071A|EL3000A|EL1030A|EL1022A|EL1010A|EL1064A|EL1014A|EL500AZ|ELAP15D7PW|ELAP45D8PW|AS3401A|955A|AS3101A|8711AZ|AS1101B|4870MZ|3500AE|AS1061A|AS1051A|AS1041A|990A|AS3011A|1934B|3684F|AS3001A|439AZ|AS2011A|3670G|AS2000A|80A|41A|71B|313A|30A|AS100B|169D|66699A\-4|69900A\-4|69944\-4|69955A\-4|63034|63006|63025|63027|63028|63029|68306|63030|63031|63032|63035|64521|64522|64523|64526|64524|64525|68303|68304|68305|68307|62630F\-2|62647F\-2|62632F\-4|62963F\-2|62636D\-2|66643F\-2|64221D\-2|69116D\-4|62640F\-2|62637F\-2|62653F\-2|64912\-2|68990|68991|68992|69996|EL023|EL024|62607\-6|62609\-6|62645D\-2|62461|62642D\-4|AS2003PAB|AS2003FUF|4703F|4704RES|AS2001FUF|AS2001TIS|AS2002PMA|AS2002TLU|150A|470AZ|4773AZ|96JZ|5403A|R4870K|431DX|5400A|3281AZ|3276BVZ|AS1049A|AS1000A|AS1050A|AS1055AX|EL1000B|EL1019A|EL2003A|EL8501AZ|EL8502F|EL4101A|EL8602A|EL4042A"
                }
              }
            },
            actions: defaultActions('armhammer')
          }, {
            id: 'walmart-campaign010',
            description: "Frigidaire pdp chat",
            target: {
              pdp: {
                name: {
                  whitelist: 'Frigidaire'
                },
                model: {
                  whitelist: "FPSC07K5NS|FPTT02D7MS|FPTT04D7MS|FPDC12D7MS|FPTC10D7NS|FPKT58D7NS|FPJB56B7MS|FPPG12K7MS|FPCO06D7MS|EL4650A|EL4305AZ|EL4300B|EL4040A|EL4071A|EL3000A|EL1030A|EL1022A|EL1010A|EL1064A|EL1014A|EL500AZ|ELAP15D7PW|ELAP45D8PW|AS3401A|955A|AS3101A|8711AZ|AS1101B|4870MZ|3500AE|AS1061A|AS1051A|AS1041A|990A|AS3011A|1934B|3684F|AS3001A|439AZ|AS2011A|3670G|AS2000A|80A|41A|71B|313A|30A|AS100B|169D|66699A\-4|69900A\-4|69944\-4|69955A\-4|63034|63006|63025|63027|63028|63029|68306|63030|63031|63032|63035|64521|64522|64523|64526|64524|64525|68303|68304|68305|68307|62630F\-2|62647F\-2|62632F\-4|62963F\-2|62636D\-2|66643F\-2|64221D\-2|69116D\-4|62640F\-2|62637F\-2|62653F\-2|64912\-2|68990|68991|68992|69996|EL023|EL024|62607\-6|62609\-6|62645D\-2|62461|62642D\-4|AS2003PAB|AS2003FUF|4703F|4704RES|AS2001FUF|AS2001TIS|AS2002PMA|AS2002TLU|150A|470AZ|4773AZ|96JZ|5403A|R4870K|431DX|5400A|3281AZ|3276BVZ|AS1049A|AS1000A|AS1050A|AS1055AX|EL1000B|EL1019A|EL2003A|EL8501AZ|EL8502F|EL4101A|EL8602A|EL4042A"
                }
              }
            },
            actions: defaultActions('frigidaire')
          }, {
            id: 'walmart-campaign011',
            description: "Eureka pdp chat",
            target: {
              pdp: {
                name: {
                  whitelist: 'Eureka'
                },
                model: {
                  whitelist: "^980B$|^169J$|FPSC07K5NS|FPTT02D7MS|FPTT04D7MS|FPDC12D7MS|FPTC10D7NS|FPKT58D7NS|FPJB56B7MS|FPPG12K7MS|FPCO06D7MS|EL4650A|EL4305AZ|EL4300B|EL4040A|EL4071A|EL3000A|EL1030A|EL1022A|EL1010A|EL1064A|EL1014A|EL500AZ|ELAP15D7PW|ELAP45D8PW|AS3401A|955A|AS3101A|8711AZ|AS1101B|4870MZ|3500AE|AS1061A|AS1051A|AS1041A|990A|AS3011A|1934B|3684F|AS3001A|439AZ|AS2011A|3670G|AS2000A|80A|41A|71B|313A|30A|AS100B|169D|66699A\-4|69900A\-4|69944\-4|69955A\-4|63034|63006|63025|63027|63028|63029|68306|63030|63031|63032|63035|64521|64522|64523|64526|64524|64525|68303|68304|68305|68307|62630F\-2|62647F\-2|62632F\-4|62963F\-2|62636D\-2|66643F\-2|64221D\-2|69116D\-4|62640F\-2|62637F\-2|62653F\-2|64912\-2|68990|68991|68992|69996|EL023|EL024|62607\-6|62609\-6|62645D\-2|62461|62642D\-4|AS2003PAB|AS2003FUF|4703F|4704RES|AS2001FUF|AS2001TIS|AS2002PMA|AS2002TLU|150A|470AZ|4773AZ|96JZ|5403A|R4870K|431DX|5400A|3281AZ|3276BVZ|AS1049A|AS1000A|AS1050A|AS1055AX|EL1000B|EL1019A|EL2003A|EL8501AZ|EL8502F|EL4101A|EL8602A|EL4042A|AS2004SUY|AS2004SBL|AS104SBT|AS104SGT|AS104DPT"
                }
              }
            },
            actions: defaultActions('eureka')
          }, {
            id: 'walmart-campaign012',
            description: "LG pdp chat",
            target: {
              pdp: {
                brand: {
                  whitelist: '^LG$'
                },
                name: {
                  blacklist: 'prepaid|TracFone|NET10|Total Wireless|Fosmon|MetroPCS|Verizon|Boost Mobile|Walmart Family Mobile|Virgin|Cricket|FreedomPop|T-Mobile|Univision|Headset|AT\&T|Sprint|Watch|Battery'
                },
                tags: {
                  blacklist: 'Home|Home Improvement|Thermostats \& Accessories|Vacuums \& Floor Care|Computers|iPad \& Tablets|Fitness \& Sports|Gifts|Jewelry|Cameras \& Camcorders|Computers \& Laptops|Blu-ray \& DVD Players|TV Accessories|Batteries|Replacement Electronics Batteries|Headsets|Chargers|Cases & Protectors|DVD \& Blu-ray Players|All Paper \& Printable Media|Battery Extenders'
                },
                sold_by: {
                  whitelist: 'Beach Audio Inc|Beach Camera|Electronic Express|Electronics Expo|OneCall|Overstock|Walmart store|Walmart.com|Walts TV'
                }
              }
            },
            actions: defaultActions('lg')
          }, {
            id: 'walmart-campaign013',
            description: "Lenovo pdp chat",
            target: {
              pdp: {
                brand: {
                  whitelist: 'Lenovo'
                },
                name: {
                  blacklist: 'Server|server|Refurbished'
                }
              }
            },
            actions: defaultActions('lenovo')
          }, {
            id: 'walmart-campaign014',
            description: "Magic Chef pdp chat",
            target: {
              pdp: {
                brand: {
                  whitelist: 'Magic Chef'
                }
              }
            },
            actions: defaultActions('magicchef')
          }, {
            id: 'walmart-campaign015',
            description: "Eureka SPLASH chat",
            target: {
              brand_splash: {
                brand: {
                  whitelist: 'Eureka'
                }
              }
            },
            actions: [
              {
                id: 'walmart-action003',
                options: {
                  target: 'eureka'
                }
              }
            ]
          }, {
            id: 'walmart-campaign016',
            description: "Verizon Wireless pdp chat",
            target: {
              pdp: {
                brand: {
                  whitelist: '^(Verizon Wireless|LG|HTC)$'
                },
                model: {
                  whitelist: 'VS415|Gusto 3|Cosmos 3|4FF SIM Card Kit - Verizon PP|VS810|331ZL|XT1528|VZW-MHS800LPP|VZW-HTCD100L|VZW-J100VPP|HTC 626|LG 2 Transpyre|HTC 526 Jawbone Bundle|LG Vista|26690|27410|14531|27668|14533|20820|14532|VERIZONBB 17735|37826'
                }
              }
            },
            actions: defaultActions('verizon')
          }, {
            id: 'walmart-campaign017',
            description: "AT&T pdp chat",
            target: {
              pdp: {
                brand: {
                  whitelist: 'AT\&T|ASUS|Samsung'
                },
                name: {
                  whitelist: 'AT\&T|AT&amp;T',
                  blacklist: 'Pre-Owned'
                },
                tags: {
                  whitelist: 'Android|Prepaid Minutes - Cards|Shop all No-Contract Phones'
                },
                model: {
                  blacklist: '^(17133|31390|6307A|P671B41|6142A|6159A)$'
                }
              }
            },
            actions: defaultActions('att')
          }, {
            id: 'walmart-campaign018',
            description: "Mongoose pdp chat",
            target: {
              pdp: {
                brand: {
                  whitelist: 'Mongoose'
                },
                model: {
                  blacklist: 'MG-087G-S|MG-087G-L|MG-088B-L|MG-088B-S'
                },
                tags: {
                  blacklist: 'Roller Skates|Inline Skates'
                }
              }
            },
            actions: defaultActions('mongoose')
          }, {
            id: 'walmart-campaign019',
            description: "Schwinn pdp chat",
            target: {
              pdp: {
                brand: {
                  whitelist: 'Schwinn'
                },
                tags: {
                  whitelist: 'Bikes',
                  blacklist: 'Exercise Bikes'
                },
                name: {
                  blacklist: '\\bShorts\\b'
                }
              }
            },
            actions: defaultActions('schwinn')
          }, {
            id: 'walmart-campaign020',
            description: "Kid Trax pdp chat",
            target: {
              pdp: {
                brand: {
                  whitelist: 'Kid Trax|KidTrax|Disney'
                },
                tags: {
                  whitelist: 'Riding Toy'
                },
                model: {
                  whitelist: '^KT'
                }
              }
            },
            actions: defaultActions('kidtrax')
          }, {
            id: 'walmart-campaign021',
            description: "Roadmaster pdp chat",
            target: {
              pdp: {
                brand: {
                  whitelist: 'Roadmaster'
                },
                tags: {
                  whitelist: 'Bikes'
                }
              }
            },
            actions: defaultActions('roadmaster')
          }, {
            id: 'walmart-campaign022',
            description: "Seagate pdp chat",
            target: {
              pdp: {
                brand: {
                  whitelist: '^Seagate$'
                },
                model: {
                  blacklist: '^STCT100$|^STCT10000100$|^STCT2000100$|^STCT4000100$|^STCT8000100$|^STCU100$|^STCU16000100$|^STCU20000100$|^STCU4000100$|^STCU8000100$|^STDD100$|^STDD10000100$|^STDD2000100$|^STDD4000100$|^STDD8000100$|^STDE100$|^STDE16000100$|^STDE20000100$|^STDE4000100$|^STDE8000100$|^STDF100$|^STDF12000100$|^STDF24000100$|^STDF30000100$|^STDF6000100$'
                }
              }
            },
            actions: defaultActions('seagate/default')
          }, {
            id: 'walmart-campaign023',
            description: "Seagate pdp chat (business nas)",
            target: {
              pdp: {
                brand: {
                  whitelist: '^Seagate$'
                },
                model: {
                  whitelist: '^STCT100$|^STCT10000100$|^STCT2000100$|^STCT4000100$|^STCT8000100$|^STCU100$|^STCU16000100$|^STCU20000100$|^STCU4000100$|^STCU8000100$|^STDD100$|^STDD10000100$|^STDD2000100$|^STDD4000100$|^STDD8000100$|^STDE100$|^STDE16000100$|^STDE20000100$|^STDE4000100$|^STDE8000100$|^STDF100$|^STDF12000100$|^STDF24000100$|^STDF30000100$|^STDF6000100$'
                }
              }
            },
            actions: defaultActions('seagate/business_nas')
          }, {
            id: 'walmart-campaign024',
            description: "Netgear pdp chat",
            target: {
              pdp: {
                brand: {
                  whitelist: 'Netgear'
                },
                name: {
                  blacklist: 'On Networks'
                }
              }
            },
            actions: defaultActions('netgear')
          }, {
            id: 'walmart-campaign025',
            description: "Bissell pdp chat",
            target: {
              pdp: {
                brand: {
                  whitelist: 'Bissell'
                },
                name: {
                  blacklist: 'Commercial'
                },
                tags: {
                  whitelist: 'Canister Vacuums|Carpet Cleaners|Bagless Uprights|Handheld Vacuums|Steam Cleaners|Pet Vacuums|Stick Vacuums|Bagged Uprights|Robotic Vacuums|Steam Cleaners|College Dorm Living',
                  blacklist: 'Sweepers'
                }
              }
            },
            actions: defaultActions('bissell')
          }, {
            id: 'walmart-campaign026',
            description: "Dyson SPLASH chat",
            target: {
              brand_splash: {
                brand: {
                  whitelist: 'Dyson'
                }
              }
            },
            actions: [
              {
                id: 'walmart-action003',
                options: {
                  target: 'dyson'
                }
              }
            ]
          }, {
            id: 'walmart-campaign028',
            description: "ChatAds Demo CTA",
            target: {
              pdp: {
                brand: {
                  whitelist: 'Hp'
                },
                merchant_sku: {
                  whitelist: '48428372'
                }
              }
            },
            actions: defaultActions('demo.hp')
          }, {
            id: 'walmart-campaign027',
            description: "Haier pdp chat",
            target: {
              pdp: {
                brand: {
                  whitelist: '^(Haier|Generic)$'
                },
                model: {
                  whitelist: '^(HFU0100ACW|HF35CM23NW|HFC9204ACW|HFC1104ACW|HFC1504ACW|HBCN05FVS|HVCE15DBH|HVCE15BBH|HMC725SESS|HMC1120BEBB|HMC1640BEWW|HLC1700AXS|HLTD600AEW|HLTW600AXW|HWF05XCR-L|HWR05XCR-L|HWR06XCR-L|HWE08XCR-L|HWE10XCR-L|HWE12XCR-L|HWE15XCR-L|HWE18VCR-L|HWE24VCR-L|ESAQ406P|ESAQ408P|HPFD12XHP-LB|HPND14XHP|HE30ER-L|HE70ER-L|HTWR08XCR|HTWR10XCR|HTWR10VCR|HTWR12XCR|HTWR12VCR|HWF05XCP-L|ESA405P-L|HMC720BEWW|HVTEC16DABS|HMC935SESS|HMC1035SESS|HMC920BEBB|HLP21N|HLPW028AXW|HC17SW20RB|HC17SF10RB|HC27SW20RB|HC27SW20RV|HC32TW10SB|HC32TW10SV|HC33SW20RB|HC46SF10SV|HF50CW20W|HF71CW20W|HVTEC06ABS|HVTEC08ABS|HVTEC12DABS|HVTEC18DABS|HMC720BEBB|HMC1120BEWW|HMC920BEWW|HLP141E|HLP24E|HWF05XCR-LD|HWR05XCR-LD|HWR06XCR-LD|HWE08XCR-LD|HWE10XCR-LD|HWE12XCR-LD|HPB08XCM-LW|HPD10XCR-LW|HPC12XCR-LW|HPND14XCP|DM32M-L|DE45EM-L|DE65EM-L|EST08XCP|EST10VCP|EST12VCP|HTTWSB|HHC15CPCV|HHC15CPCW|HHF15CPC|HHTF15CPCV|HM70EP)$'
                }
              }
            },
            actions: defaultActions('haier')
          }, {
            id: 'walmart-campaign028',
            description: "Nintendo pdp chat",
            target: {
              pdp: {
                brand: {
                  whitelist: '^Nintendo$'
                }
              }
            },
            actions: defaultActions('nintendo')
          }, {
            id: 'walmart-campaign029',
            description: "Vega pdp chat",
            target: {
              pdp: {
                name: {
                  whitelist: '^Vega\\b|\\bVega\\b|\\bVega$'
                },
                tags: {
                  whitelist: 'Health|Food|Vitamins'
                }
              }
            },
            actions: defaultActions('vega')
          }
        ],
        CHANNEL_BASE_DOMAIN: 'walmart.com',
        CHANNEL_NAME: 'walmart',
        CHANNEL_TITLE: 'Walmart',
        CHANNEL_POSTCHAT_SURVEY: true,
        LOGGING_ENABLED: true,
        STYLE_COLOR_MAIN: '#007DC6',
        STYLE_CUSTOM_CSS: customCss
      },
      support: function(config) {
        var continueWithProductData, isBrandSplash, stringSmash, verifyProductDataAndInitialize;
        if (config.POPUP_CHATID) {
          return;
        }
        if (this.window.location.search.indexOf('start_chat') !== -1) {
          CID('chats.open', getParameterByName('start_chat'));
        }
        agentAvailabilityPoll();
        isBrandSplash = function() {
          if ($('.TDM_crumbs').length) {
            $('body').append('<div id="chatid-cta-splash-side-container"></div>');
            return true;
          } else {
            return false;
          }
        };
        stringSmash = function(str) {
          return str.toLowerCase().replace(/[\s]+/g, '');
        };
        CID('events.hook', {
          codeMap: {
            'pdp': 'pdp',
            'start_chat': 'start_chat'
          },
          trackEvent: function(_arg) {
            var beaconPixel, code, csid, metadata;
            csid = _arg.csid, code = _arg.code;
            metadata = CID.chatbar.domain.pageModel.get('metadata');
            if (code === 'pdp' && CID.chatbar.domain.campaignRunner.matches().length) {
              if (metadata.brand && (beaconPixel = beaconPixels[stringSmash(metadata.brand)])) {
                $('body').append(beaconPixel(csid));
                CID.chatbar.debug("[walmart support] fired beacon pixel for " + metadata.brand);
              }
              $('body').append(beaconPixels.impression(metadata.merchant_sku, csid));
              CID.chatbar.debug("[walmart support] fired beacon pixel for chatid-enabled page");
            }
            if (code === 'start_chat') {
              $('body').append(beaconPixels.interaction(metadata.merchant_sku, csid));
              return CID.chatbar.debug("[walmart support] fired beacon pixel for chatid interaction");
            }
          }
        });
        continueWithProductData = function() {
          var $priceFlags, $productSubhead, brand, buyingOptions, choiceData, el, model, price, product, productData, salePrice, tson, unitPrice, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
          productData = window.require('product/data');
          if (productData.analyticsData.pageType !== 'ProductPage') {
            return CID.chatbar.debug("[walmart support] not a pdp");
          }
          $productSubhead = $('.product-subhead');
          if ($productSubhead.length) {
            $productSubhead.after("<div id='chatid-cta-pdp'></div>");
          }
          $priceFlags = $('.price-flags');
          if ($priceFlags.length) {
            $priceFlags.append("<span class='cid-cta-wrapper cidf-hide' id='chatid-cta-pdp-ribbon' style='background:transparent;'></span>");
          }
          if (window.require.defined('choice/data')) {
            choiceData = window.require('choice/data') || {};
          } else if (window.require.defined('non-choice/data')) {
            choiceData = window.require('non-choice/data') || {};
          }
          if (choiceData) {
            if (((_ref = choiceData.standard) != null ? _ref.length : void 0) && ((_ref1 = choiceData.standard[0].components) != null ? _ref1.length : void 0)) {
              brand = (choiceData.standard[0].components[0].product || {}).brand;
            } else if (((_ref2 = choiceData.required) != null ? _ref2.length : void 0) && ((_ref3 = choiceData.required[0].components) != null ? _ref3.length : void 0)) {
              brand = (choiceData.required[0].components[0].product || {}).brand;
            }
            CID.chatbar.debug("[walmart support] detected multi-product choice page");
          } else {
            brand = (_ref4 = productData.analyticsData) != null ? _ref4.brand : void 0;
          }
          buyingOptions = productData.buyingOptions || {};
          model = $.trim($('.js-product-specs .main-table tr:contains("Model No") td:last-child').text());
          model || (model = $('meta[itemprop=model]').attr('content'));
          price = buyingOptions.price || {};
          salePrice = price.currencyAmount;
          unitPrice = ((_ref5 = buyingOptions.wasPrice) != null ? _ref5.currencyAmount : void 0) || salePrice;
          tson = function(value) {
            if (value) {
              return "" + value;
            } else {
              return null;
            }
          };
          product = {
            brand: brand,
            name: productData.productName,
            merchant_sku: tson(buyingOptions.usItemId),
            model: model,
            unit_price: tson(unitPrice),
            sale_price: tson(salePrice),
            currency: tson(price.currencyUnit),
            tags: (function() {
              var _i, _len, _ref6, _results;
              _ref6 = $('.breadcrumb-list-mini a');
              _results = [];
              for (_i = 0, _len = _ref6.length; _i < _len; _i++) {
                el = _ref6[_i];
                _results.push($.trim($(el).text()));
              }
              return _results;
            })(),
            sold_by: $('.primary-seller.copy-mini b').filter(':last').text()
          };
          return CID('page.setType', 'pdp', product);
        };
        verifyProductDataAndInitialize = function() {
          return anticipate({
            condition: function() {
              var _ref;
              return ((_ref = window.require) != null ? typeof _ref.defined === "function" ? _ref.defined('product/data') : void 0 : void 0) && window.require('product/data');
            },
            progress: function(tries) {
              return CID.chatbar.debug("[walmart support] no 'product/data' module found (attempt " + tries + ")");
            },
            fail: function() {
              return CID.chatbar.debug("[walmart support] could not find 'product/data' module");
            },
            success: function() {
              return continueWithProductData();
            },
            interval: 100,
            attempts: 40
          });
        };
        if (!isBrandSplash()) {
          return verifyProductDataAndInitialize();
        }
      }
    };
  });

}).call(this);

})(CID.amd.requirejs, CID.amd.require, CID.amd.define);