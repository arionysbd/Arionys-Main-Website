import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Swal from "sweetalert2";
import html2canvas from "html2canvas";
import { 
    Tabs, Tab, Input, Button, Card, CardBody, Switch, 
    Accordion, AccordionItem, Select, SelectItem, Tooltip, 
    Divider, Slider, RadioGroup, Radio, Chip, Textarea,
    Popover, PopoverTrigger, PopoverContent
} from "@nextui-org/react";
import { HexColorPicker } from "react-colorful";
import { jwtDecode } from "jwt-decode";
import { 
    FaPen, FaTrash, FaDownload, FaFolder, FaPlus, FaQrcode, 
    FaLink, FaMagic, FaPalette, FaChartBar, FaSync, FaWifi, 
    FaEnvelope, FaAddressCard, FaFont, FaImage, FaEye, FaShapes,
    FaGlobe, FaSms, FaWhatsapp, FaCalendar, FaUndo,
    FaMapMarkerAlt, FaUser, FaPhone, FaBriefcase, FaBuilding,
    FaLayerGroup, FaCrop, FaBan, FaCheck
} from "react-icons/fa";

const FrameWrapper = ({ children, frameStyle, frameText, frameColor, frameTextColor }) => {
    if (frameStyle === 'none') return children;

    const commonContainerClass = "bg-white p-2 rounded-lg shadow-sm overflow-hidden flex flex-col items-center justify-center";

    if (frameStyle === 'bottom-bar') {
        return (
            <div className={`${commonContainerClass} pb-0`} style={{ borderColor: frameColor }}>
                <div className="p-2">{children}</div>
                <div className="w-full py-2 text-center font-bold text-sm mt-1" style={{ backgroundColor: frameColor, color: frameTextColor }}>
                    {frameText}
                </div>
            </div>
        );
    }

    if (frameStyle === 'top-bar') {
        return (
            <div className={`${commonContainerClass} pt-0`} style={{ borderColor: frameColor }}>
                <div className="w-full py-2 text-center font-bold text-sm mb-1" style={{ backgroundColor: frameColor, color: frameTextColor }}>
                    {frameText}
                </div>
                <div className="p-2">{children}</div>
            </div>
        );
    }

    if (frameStyle === 'bottom-bubble') {
        return (
            <div className="flex flex-col items-center">
                <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100">{children}</div>
                <div className="relative mt-2 px-4 py-1 rounded-full text-sm font-bold shadow-sm" style={{ backgroundColor: frameColor, color: frameTextColor }}>
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 transform rotate-45" style={{ backgroundColor: frameColor }}></div>
                    <span className="relative z-10">{frameText}</span>
                </div>
            </div>
        );
    }

    if (frameStyle === 'top-bubble') {
        return (
            <div className="flex flex-col items-center">
                <div className="relative mb-2 px-4 py-1 rounded-full text-sm font-bold shadow-sm" style={{ backgroundColor: frameColor, color: frameTextColor }}>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 transform rotate-45" style={{ backgroundColor: frameColor }}></div>
                    <span className="relative z-10">{frameText}</span>
                </div>
                <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100">{children}</div>
            </div>
        );
    }

    if (frameStyle === 'polaroid') {
        return (
            <div className="bg-white p-3 pb-12 shadow-md border border-gray-200 transform -rotate-1 relative">
                <div className="bg-gray-50">{children}</div>
                <div className="absolute bottom-4 left-0 w-full text-center font-serif text-gray-700 font-semibold">{frameText}</div>
            </div>
        );
    }

    if (frameStyle === 'heavy-box') {
        return (
            <div className="p-4 bg-white border-[8px]" style={{ borderColor: frameColor }}>
                {children}
            </div>
        );
    }

    if (frameStyle === 'scan-me-bottom') {
        return (
            <div className="relative p-2 pb-6 bg-white border-2 rounded-md" style={{ borderColor: frameColor }}>
                {children}
                <div className="absolute bottom-0 left-0 w-full bg-black text-white text-[10px] font-bold uppercase tracking-widest text-center py-0.5" style={{ backgroundColor: frameColor, color: frameTextColor }}>
                    SCAN ME
                </div>
            </div>
        );
    }

    if (frameStyle === 'scan-me-top') {
        return (
            <div className="relative p-2 pt-6 bg-white border-2 rounded-md" style={{ borderColor: frameColor }}>
                <div className="absolute top-0 left-0 w-full bg-black text-white text-[10px] font-bold uppercase tracking-widest text-center py-0.5" style={{ backgroundColor: frameColor, color: frameTextColor }}>
                    SCAN ME
                </div>
                {children}
            </div>
        );
    }
    
    if (frameStyle === 'ribbon-bottom') {
          return (
             <div className="relative bg-white p-3 shadow-md border border-gray-200 mb-4">
                 {children}
                 <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-1 text-xs font-bold shadow-lg" style={{ backgroundColor: frameColor, color: frameTextColor, clipPath: 'polygon(0 0, 100% 0, 95% 50%, 100% 100%, 0 100%, 5% 50%)' }}>
                     {frameText}
                 </div>
             </div>
          );
     }
     
     if (frameStyle === 'phone') {
         return (
             <div className="p-2 bg-black rounded-[24px] border-4 border-gray-800 shadow-xl">
                  <div className="bg-white rounded-[16px] overflow-hidden border border-gray-300">
                      {children}
                  </div>
             </div>
         );
     }
 
     if (frameStyle === 'laptop') {
         return (
             <div className="flex flex-col items-center">
                 <div className="p-2 bg-black rounded-t-lg border-4 border-gray-800 border-b-0 shadow-xl">
                     <div className="bg-white overflow-hidden border border-gray-300">
                         {children}
                     </div>
                 </div>
                 <div className="w-[120%] h-4 bg-gray-800 rounded-b-lg shadow-md border-t border-gray-600"></div>
             </div>
         );
     }
     
     // Default fallback or other styles
    return (
        <div className="p-2 border-2 border-dashed border-gray-300 rounded-lg">
             {children}
        </div>
    );
};

const QrCodeGenerator = () => {
    const [activeView, setActiveView] = useState("create"); // 'create', 'folders', 'edit'
    
    // QR Generation State
    const [qrCode, setQrCode] = useState(null);
    const qrRef = useRef(null);
    const frameRef = useRef(null);
    const [qrType, setQrType] = useState("static"); // 'static', 'dynamic'
    
    // Static QR Sub-types
    const [staticType, setStaticType] = useState("text"); // text, url, wifi, email, vcard, sms, whatsapp, event
    
    // Content Inputs
    const [qrName, setQrName] = useState("");
    const [inputValue, setInputValue] = useState(""); // General text/url content
    
    // Wifi State
    const [wifiSsid, setWifiSsid] = useState("");
    const [wifiPassword, setWifiPassword] = useState("");
    const [wifiEncryption, setWifiEncryption] = useState("WPA");
    const [wifiHidden, setWifiHidden] = useState(false);
    
    // Email State
    const [emailTo, setEmailTo] = useState("");
    const [emailSubject, setEmailSubject] = useState("");
    const [emailBody, setEmailBody] = useState("");

    // SMS State
    const [smsPhone, setSmsPhone] = useState("");
    const [smsMessage, setSmsMessage] = useState("");

    // WhatsApp State
    const [whatsappPhone, setWhatsappPhone] = useState("");
    const [whatsappMessage, setWhatsappMessage] = useState("");

    // Event State
    const [eventTitle, setEventTitle] = useState("");
    const [eventLocation, setEventLocation] = useState("");
    const [eventStart, setEventStart] = useState("");
    const [eventEnd, setEventEnd] = useState("");
    const [eventNote, setEventNote] = useState("");


    // vCard State
    const [vFirstName, setVFirstName] = useState("");
    const [vLastName, setVLastName] = useState("");
    const [vPhone, setVPhone] = useState("");
    const [vMobile, setVMobile] = useState("");
    const [vEmail, setVEmail] = useState("");
    const [vWebsite, setVWebsite] = useState("");
    const [vCompany, setVCompany] = useState("");
    const [vJob, setVJob] = useState("");
    const [vStreet, setVStreet] = useState("");
    const [vCity, setVCity] = useState("");
    const [vZip, setVZip] = useState("");
    const [vState, setVState] = useState("");
    const [vCountry, setVCountry] = useState("");
    
    // Dynamic State
    const [targetUrl, setTargetUrl] = useState("");
    const [generatedUrl, setGeneratedUrl] = useState(""); 

    // Folder State
    const [folderTab, setFolderTab] = useState("static");
    const [staticList, setStaticList] = useState([]);
    const [dynamicList, setDynamicList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingQr, setEditingQr] = useState(null);

    // Auth State
    const [token, setToken] = useState("");
    const [fileExt, setFileExt] = useState("png");

    // Wizard State
    const [currentStep, setCurrentStep] = useState(1); // 1: Type, 2: Content, 3: Design

    // Design State
    const [size, setSize] = useState(200);
    const [margin, setMargin] = useState(0);
    const [logoUrl, setLogoUrl] = useState("");
    const [logoSize, setLogoSize] = useState(0.2);
    const [logoMargin, setLogoMargin] = useState(10);
    const [errorLevel, setErrorLevel] = useState("M");

    const [dotStyle, setDotStyle] = useState("square");
    const [dotsType, setDotsType] = useState("solid");
    const [dotsColor, setDotsColor] = useState("#000000");
    const [dotsGradientType, setDotsGradientType] = useState("linear");
    const [dotsGradientColor1, setDotsGradientColor1] = useState("#000000");
    const [dotsGradientColor2, setDotsGradientColor2] = useState("#000000");
    const [dotsGradientRotation, setDotsGradientRotation] = useState(0);

    const [bgType, setBgType] = useState("solid");
    const [bgTransparent, setBgTransparent] = useState(false);
    const [bgColor, setBgColor] = useState("#ffffff");
    const [bgGradientType, setBgGradientType] = useState("linear");
    const [bgGradientColor1, setBgGradientColor1] = useState("#ffffff");
    const [bgGradientColor2, setBgGradientColor2] = useState("#ffffff");
    const [bgGradientRotation, setBgGradientRotation] = useState(0);

    const [cornerSquareStyle, setCornerSquareStyle] = useState("square");
    const [cornerDotStyle, setCornerDotStyle] = useState("square");
    const [useCustomEyeColors, setUseCustomEyeColors] = useState(false);
    const [cornerSquareColor, setCornerSquareColor] = useState("#000000");
    const [cornerDotColor, setCornerDotColor] = useState("#000000");

    // Frame State
    const [frameStyle, setFrameStyle] = useState("none");
    const [frameText, setFrameText] = useState("Scan Me!");
    const [frameColor, setFrameColor] = useState("#000000");
    const [frameTextColor, setFrameTextColor] = useState("#ffffff");

    // Helper to get Icon for Type
    const getTypeIcon = (type) => {
        switch(type) {
            case 'text': return <FaFont />;
            case 'url': return <FaGlobe />;
            case 'wifi': return <FaWifi />;
            case 'email': return <FaEnvelope />;
            case 'vcard': return <FaAddressCard />;
            case 'sms': return <FaSms />;
            case 'whatsapp': return <FaWhatsapp />;
            case 'event': return <FaCalendar />;
            default: return <FaQrcode />;
        }
    };

    // Helper: Get Design Configuration
    const getDesignConfig = () => ({
        bgType, bgTransparent, bgColor, bgGradientType, bgGradientColor1, bgGradientColor2, bgGradientRotation,
        dotsType, dotsColor, dotsGradientType, dotsGradientColor1, dotsGradientColor2, dotsGradientRotation,
        cornerSquareColor, cornerDotColor, useCustomEyeColors,
        dotStyle, cornerSquareStyle, cornerDotStyle,
        logoUrl, logoSize, logoMargin,
        errorLevel, margin,
        frameStyle, frameText, frameColor, frameTextColor
    });

    const templates = [
        { name: "Classic", config: { dotStyle: "square", cornerSquareStyle: "square", bgType: "solid", dotsType: "solid", bgColor: "#ffffff", dotsColor: "#000000" } },
        { name: "Modern Blue", config: { dotStyle: "rounded", cornerSquareStyle: "extra-rounded", bgType: "solid", dotsType: "gradient", dotsGradientType: "linear", dotsGradientColor1: "#0000FF", dotsGradientColor2: "#00BFFF", bgColor: "#ffffff" } },
        { name: "Eco Green", config: { dotStyle: "dots", cornerSquareStyle: "dot", bgType: "gradient", bgGradientType: "linear", bgGradientColor1: "#f0fff4", bgGradientColor2: "#ffffff", dotsType: "solid", dotsColor: "#228B22" } },
        { name: "Dark Mode", config: { dotStyle: "square", cornerSquareStyle: "square", bgType: "solid", bgColor: "#000000", dotsType: "solid", dotsColor: "#ffffff" } },
        { name: "Sunset", config: { dotStyle: "classy", cornerSquareStyle: "extra-rounded", bgType: "gradient", bgGradientType: "linear", bgGradientColor1: "#FFD700", bgGradientColor2: "#FF8C00", dotsType: "solid", dotsColor: "#8B0000" } }
    ];

    const applyTemplate = (template) => {
        const t = template.config;
        if(t.bgType) setBgType(t.bgType);
        if(t.bgColor) setBgColor(t.bgColor);
        if(t.bgGradientType) setBgGradientType(t.bgGradientType);
        if(t.bgGradientColor1) setBgGradientColor1(t.bgGradientColor1);
        if(t.bgGradientColor2) setBgGradientColor2(t.bgGradientColor2);
        
        if(t.dotsType) setDotsType(t.dotsType);
        if(t.dotsColor) setDotsColor(t.dotsColor);
        if(t.dotsGradientType) setDotsGradientType(t.dotsGradientType);
        if(t.dotsGradientColor1) setDotsGradientColor1(t.dotsGradientColor1);
        if(t.dotsGradientColor2) setDotsGradientColor2(t.dotsGradientColor2);
        
        if(t.dotStyle) setDotStyle(t.dotStyle);
        if(t.cornerSquareStyle) setCornerSquareStyle(t.cornerSquareStyle);
        if(t.cornerDotStyle) setCornerDotStyle(t.cornerDotStyle);
        
        // Reset advanced overrides
        setUseCustomEyeColors(false);
    };

    // Helper: Construct Data based on Static Type
    const getStaticData = () => {
        if (staticType === "wifi") {
            return `WIFI:T:${wifiEncryption};S:${wifiSsid};P:${wifiPassword};H:${wifiHidden};;`;
        }
        if (staticType === "email") {
            return `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        }
        if (staticType === "sms") {
            return `smsto:${smsPhone}:${smsMessage}`;
        }
        if (staticType === "whatsapp") {
            return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(whatsappMessage)}`;
        }
        if (staticType === "event") {
            // Simple VEVENT format
            const formatTime = (t) => t ? t.replace(/[-:]/g, '') : '';
            return `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${eventTitle}\nLOCATION:${eventLocation}\nDTSTART:${formatTime(eventStart)}\nDTEND:${formatTime(eventEnd)}\nDESCRIPTION:${eventNote}\nEND:VEVENT\nEND:VCALENDAR`;
        }
        if (staticType === "vcard") {
            return `BEGIN:VCARD\nVERSION:3.0\nN:${vLastName};${vFirstName};;;\nFN:${vFirstName} ${vLastName}\nORG:${vCompany}\nTITLE:${vJob}\nTEL;TYPE=WORK,VOICE:${vPhone}\nTEL;TYPE=CELL,VOICE:${vMobile}\nEMAIL:${vEmail}\nURL:${vWebsite}\nADR;TYPE=WORK:;;${vStreet};${vCity};${vState};${vZip};${vCountry}\nEND:VCARD`;
        }
        // Text, URL
        return inputValue;
    };

    const getMetadata = () => {
        if (staticType === 'wifi') return { wifiSsid, wifiPassword, wifiEncryption, wifiHidden };
        if (staticType === 'email') return { emailTo, emailSubject, emailBody };
        if (staticType === 'sms') return { smsPhone, smsMessage };
        if (staticType === 'whatsapp') return { whatsappPhone, whatsappMessage };
        if (staticType === 'event') return { eventTitle, eventLocation, eventStart, eventEnd, eventNote };
        if (staticType === 'vcard') return { vFirstName, vLastName, vPhone, vMobile, vEmail, vWebsite, vCompany, vJob, vStreet, vCity, vZip, vState, vCountry };
        return { inputValue };
    };

    const getCurrentData = () => {
        if (qrType === "dynamic") {
            return generatedUrl || targetUrl || "https://arionys.com";
        }
        return getStaticData() || "https://arionys.com";
    };

    useEffect(() => {
        import("qr-code-styling").then((QRCodeStyling) => {
            const options = {
                width: size,
                height: size,
                margin: margin,
                type: "svg",
                data: getCurrentData(),
                image: logoUrl,
                qrOptions: {
                    errorCorrectionLevel: errorLevel
                },
                dotsOptions: {
                    type: dotStyle,
                    color: dotsType === "solid" ? dotsColor : undefined,
                    gradient: dotsType === "gradient" ? {
                        type: dotsGradientType,
                        rotation: dotsGradientRotation * (Math.PI / 180),
                        colorStops: [
                            { offset: 0, color: dotsGradientColor1 },
                            { offset: 1, color: dotsGradientColor2 }
                        ]
                    } : undefined
                },
                backgroundOptions: {
                    color: bgTransparent ? "transparent" : (bgType === "solid" ? bgColor : undefined),
                    gradient: (!bgTransparent && bgType === "gradient") ? {
                        type: bgGradientType,
                        rotation: bgGradientRotation * (Math.PI / 180),
                        colorStops: [
                            { offset: 0, color: bgGradientColor1 },
                            { offset: 1, color: bgGradientColor2 }
                        ]
                    } : undefined
                },
                cornersSquareOptions: {
                    type: cornerSquareStyle,
                    color: useCustomEyeColors ? cornerSquareColor : (dotsType === "solid" ? dotsColor : dotsGradientColor1)
                },
                cornersDotOptions: {
                    type: cornerDotStyle,
                    color: useCustomEyeColors ? cornerDotColor : (dotsType === "solid" ? dotsColor : dotsGradientColor1)
                },
                imageOptions: {
                    crossOrigin: "anonymous",
                    margin: logoMargin,
                    imageSize: logoSize,
                    hideBackgroundDots: true
                }
            };

            const qr = new QRCodeStyling.default(options);
            setQrCode(qr);
            if (qrRef.current) {
                qrRef.current.innerHTML = "";
                qr.append(qrRef.current);
            }
        });
    }, []);

    // Re-append QR when frame style changes (as DOM structure changes)
    useEffect(() => {
        if (qrCode && qrRef.current) {
            qrRef.current.innerHTML = "";
            qrCode.append(qrRef.current);
        }
    }, [frameStyle, qrCode]);

    // Auth Check
    useEffect(() => {
        try {
            const t = localStorage.getItem("Token");
            if (t) setToken(t);
        } catch {}
    }, []);

    // Update QR Preview
    useEffect(() => {
        if (!qrCode) return;
        const data = getCurrentData();
        
        qrCode.update({
            width: size,
            height: size,
            margin: margin,
            data: data,
            image: logoUrl || "",
            qrOptions: {
                errorCorrectionLevel: errorLevel
            },
            dotsOptions: {
                type: dotStyle,
                color: dotsType === "solid" ? dotsColor : undefined,
                gradient: dotsType === "gradient" ? {
                    type: dotsGradientType,
                    rotation: dotsGradientRotation * (Math.PI / 180),
                    colorStops: [
                        { offset: 0, color: dotsGradientColor1 },
                        { offset: 1, color: dotsGradientColor2 }
                    ]
                } : undefined
            },
            backgroundOptions: {
                color: bgTransparent ? "transparent" : (bgType === "solid" ? bgColor : undefined),
                gradient: (!bgTransparent && bgType === "gradient") ? {
                    type: bgGradientType,
                    rotation: bgGradientRotation * (Math.PI / 180),
                    colorStops: [
                        { offset: 0, color: bgGradientColor1 },
                        { offset: 1, color: bgGradientColor2 }
                    ]
                } : undefined
            },
            cornersSquareOptions: {
                type: cornerSquareStyle,
                color: useCustomEyeColors ? cornerSquareColor : (dotsType === "solid" ? dotsColor : dotsGradientColor1)
            },
            cornersDotOptions: {
                type: cornerDotStyle,
                color: useCustomEyeColors ? cornerDotColor : (dotsType === "solid" ? dotsColor : dotsGradientColor1)
            },
            imageOptions: {
                imageSize: logoSize,
                margin: logoMargin,
                hideBackgroundDots: true
            }
        });
    }, [
        qrCode, inputValue, targetUrl, generatedUrl, qrType, size, margin, errorLevel,
        dotStyle, dotsType, dotsColor, dotsGradientType, dotsGradientColor1, dotsGradientColor2, dotsGradientRotation,
        bgType, bgTransparent, bgColor, bgGradientType, bgGradientColor1, bgGradientColor2, bgGradientRotation,
        cornerSquareStyle, cornerDotStyle, useCustomEyeColors, cornerSquareColor, cornerDotColor,
        logoUrl, logoSize, logoMargin,
        staticType, wifiSsid, wifiPassword, wifiEncryption, wifiHidden, emailTo, emailSubject, emailBody,
        vFirstName, vLastName, vPhone, vMobile, vEmail, vWebsite, vCompany, vJob, vStreet, vCity, vZip, vState, vCountry,
        smsPhone, smsMessage, whatsappPhone, whatsappMessage, eventTitle, eventLocation, eventStart, eventEnd, eventNote
    ]);

    // Fetch Lists
    const fetchStaticList = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/qrcode/static/list", {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            const data = await res.json();
            if (Array.isArray(data)) setStaticList(data);
        } catch {}
        setLoading(false);
    };

    const fetchDynamicList = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/qrcode/list", {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            const data = await res.json();
            if (Array.isArray(data)) setDynamicList(data);
        } catch {}
        setLoading(false);
    };

    useEffect(() => {
        if (activeView === "folders") {
            if (folderTab === "static") fetchStaticList();
            else fetchDynamicList();
        }
    }, [activeView, folderTab, token]);

    const refreshLists = () => {
        if (folderTab === "static") fetchStaticList();
        else fetchDynamicList();
    };

    // Reset All State
    const resetForm = () => {
        setQrName("");
        setInputValue("");
        setTargetUrl("");
        setGeneratedUrl("");
        setQrType("static");
        setStaticType("text");
        setEditingQr(null);

        // Reset Sub-types
        setWifiSsid(""); setWifiPassword(""); setWifiEncryption("WPA"); setWifiHidden(false);
        setEmailTo(""); setEmailSubject(""); setEmailBody("");
        setSmsPhone(""); setSmsMessage("");
        setWhatsappPhone(""); setWhatsappMessage("");
        setEventTitle(""); setEventLocation(""); setEventStart(""); setEventEnd(""); setEventNote("");
        setVFirstName(""); setVLastName(""); setVPhone(""); setVMobile(""); setVEmail("");
        setVWebsite(""); setVCompany(""); setVJob(""); setVStreet(""); setVCity(""); setVZip(""); setVState(""); setVCountry("");

        // Reset Design to Default
        setSize(300);
        setMargin(0);
        setLogoUrl("");
        setLogoSize(0.2);
        setLogoMargin(10);
        setErrorLevel("M");
        setDotStyle("square");
        setDotsType("solid");
        setDotsColor("#000000");
        setDotsGradientType("linear");
        setDotsGradientColor1("#000000");
        setDotsGradientColor2("#000000");
        setDotsGradientRotation(0);
        setBgType("solid");
        setBgTransparent(false);
        setBgColor("#ffffff");
        setBgGradientType("linear");
        setBgGradientColor1("#ffffff");
        setBgGradientColor2("#ffffff");
        setBgGradientRotation(0);
        setCornerSquareStyle("square");
        setCornerDotStyle("square");
        setUseCustomEyeColors(false);
        setCornerSquareColor("#000000");
        setCornerDotColor("#000000");
        setFrameStyle("none");
        setFrameText("Scan Me!");
        setFrameColor("#000000");
        setFrameTextColor("#ffffff");
    };

    // Helper: Validate Static Inputs
    const validateStaticInput = () => {
        if (staticType === 'wifi' && !wifiSsid) return "Wi-Fi SSID is required";
        if (staticType === 'email' && !emailTo) return "Email recipient is required";
        if (staticType === 'sms' && !smsPhone) return "Phone number is required";
        if (staticType === 'whatsapp' && !whatsappPhone) return "WhatsApp number is required";
        if (staticType === 'event' && !eventTitle) return "Event title is required";
        if (staticType === 'vcard' && (!vFirstName || !vLastName || !vPhone)) return "Name and Phone are required for vCard";
        if ((staticType === 'text' || staticType === 'url') && !inputValue) return "Content is required";
        return null;
    };

    // Handlers
    const handleCreate = async () => {
        if (!qrName) return Swal.fire("Error", "QR Name is required", "error");
        if (!token) return Swal.fire("Error", "Please login to save QR codes", "error");

        let owner = null;
        try {
            const decoded = jwtDecode(token);
            owner = decoded?.data?.id || decoded?.data?._id || decoded?.data?._doc?._id || null;
        } catch {}

        const design = getDesignConfig();

        if (qrType === "static") {
            const error = validateStaticInput();
            if (error) return Swal.fire("Error", error, "error");

            const content = getStaticData();
            const metadata = getMetadata();
            
            try {
                const res = await fetch("/api/qrcode/static/create", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: qrName, content, owner, design, type: staticType, metadata })
                });
                if (res.ok) {
                    Swal.fire("Success", "Static QR Saved!", "success");
                    resetForm();
                } else {
                    Swal.fire("Error", "Failed to save", "error");
                }
            } catch { Swal.fire("Error", "Network error", "error"); }
        } else {
            if (!targetUrl) return Swal.fire("Error", "Target URL is required", "error");
            try {
                const res = await fetch("/api/qrcode/create", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: qrName, targetUrl, owner, design })
                });
                const data = await res.json();
                if (res.ok) {
                    setGeneratedUrl(data.redirectUrl);
                    Swal.fire("Success", "Dynamic QR Created!", "success");
                    resetForm();
                } else {
                    Swal.fire("Error", data.error || "Failed", "error");
                }
            } catch { Swal.fire("Error", "Network error", "error"); }
        }
    };

    const handleDelete = async (id, type) => {
        const url = type === 'static' ? '/api/qrcode/static/delete' : '/api/qrcode/delete';
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                const res = await fetch(url, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id })
                });
                if (res.ok) {
                    Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
                    if (type === 'static') fetchStaticList();
                    else fetchDynamicList();
                } else {
                    Swal.fire('Error', 'Failed to delete', 'error');
                }
            } catch {
                Swal.fire('Error', 'Network error', 'error');
            }
        }
    };

    const handleEdit = (item, type) => {
        setEditingQr({ ...item, type });
        setActiveView("create"); // Reuse the creator view
        setQrName(item.name);
        if (type === 'static') {
            setQrType('static');
            if (item.type) {
                setStaticType(item.type);
                const m = item.metadata || {};
                if (item.type === 'text' || item.type === 'url') setInputValue(m.inputValue || item.content);
                else if (item.type === 'wifi') {
                    setWifiSsid(m.wifiSsid || "");
                    setWifiPassword(m.wifiPassword || "");
                    setWifiEncryption(m.wifiEncryption || "WPA");
                    setWifiHidden(m.wifiHidden || false);
                }
                else if (item.type === 'email') {
                    setEmailTo(m.emailTo || "");
                    setEmailSubject(m.emailSubject || "");
                    setEmailBody(m.emailBody || "");
                }
                else if (item.type === 'sms') {
                    setSmsPhone(m.smsPhone || "");
                    setSmsMessage(m.smsMessage || "");
                }
                else if (item.type === 'whatsapp') {
                    setWhatsappPhone(m.whatsappPhone || "");
                    setWhatsappMessage(m.whatsappMessage || "");
                }
                else if (item.type === 'event') {
                    setEventTitle(m.eventTitle || "");
                    setEventLocation(m.eventLocation || "");
                    setEventStart(m.eventStart || "");
                    setEventEnd(m.eventEnd || "");
                    setEventNote(m.eventNote || "");
                }
                else if (item.type === 'vcard') {
                    setVFirstName(m.vFirstName || "");
                    setVLastName(m.vLastName || "");
                    setVPhone(m.vPhone || "");
                    setVMobile(m.vMobile || "");
                    setVEmail(m.vEmail || "");
                    setVWebsite(m.vWebsite || "");
                    setVCompany(m.vCompany || "");
                    setVJob(m.vJob || "");
                    setVStreet(m.vStreet || "");
                    setVCity(m.vCity || "");
                    setVZip(m.vZip || "");
                    setVState(m.vState || "");
                    setVCountry(m.vCountry || "");
                }
            } else {
                // Fallback for old records
                setStaticType('text');
                setInputValue(item.content);
            }
        } else {
            setTargetUrl(item.targetUrl);
            setQrType('dynamic');
        }

        // Restore Design
        if (item.design) {
            const d = item.design;
            if(d.bgType) setBgType(d.bgType);
            if(d.bgTransparent !== undefined) setBgTransparent(d.bgTransparent);
            if(d.bgColor) setBgColor(d.bgColor);
            if(d.bgGradientType) setBgGradientType(d.bgGradientType);
            if(d.bgGradientColor1) setBgGradientColor1(d.bgGradientColor1);
            if(d.bgGradientColor2) setBgGradientColor2(d.bgGradientColor2);
            if(d.bgGradientRotation) setBgGradientRotation(d.bgGradientRotation);
            
            if(d.dotsType) setDotsType(d.dotsType);
            if(d.dotsColor) setDotsColor(d.dotsColor);
            if(d.dotsGradientType) setDotsGradientType(d.dotsGradientType);
            if(d.dotsGradientColor1) setDotsGradientColor1(d.dotsGradientColor1);
            if(d.dotsGradientColor2) setDotsGradientColor2(d.dotsGradientColor2);
            if(d.dotsGradientRotation) setDotsGradientRotation(d.dotsGradientRotation);
            
            if(d.cornerSquareColor) setCornerSquareColor(d.cornerSquareColor);
            if(d.cornerDotColor) setCornerDotColor(d.cornerDotColor);
            if(d.useCustomEyeColors !== undefined) setUseCustomEyeColors(d.useCustomEyeColors);
            
            if(d.dotStyle) setDotStyle(d.dotStyle);
            if(d.cornerSquareStyle) setCornerSquareStyle(d.cornerSquareStyle);
            if(d.cornerDotStyle) setCornerDotStyle(d.cornerDotStyle);
            
            if(d.logoUrl) setLogoUrl(d.logoUrl);
            if(d.logoSize) setLogoSize(d.logoSize);
            if(d.logoMargin) setLogoMargin(d.logoMargin);
            if(d.errorLevel) setErrorLevel(d.errorLevel);
            if(d.margin !== undefined) setMargin(d.margin);
            
            if(d.frameStyle) setFrameStyle(d.frameStyle);
            if(d.frameText) setFrameText(d.frameText);
            if(d.frameColor) setFrameColor(d.frameColor);
            if(d.frameTextColor) setFrameTextColor(d.frameTextColor);
        }
    };

    const handleUpdate = async () => {
        if (!editingQr) return;
        const type = editingQr.type;
        const url = type === 'static' ? '/api/qrcode/static/update' : '/api/qrcode/update';
        
        const design = getDesignConfig();
        const body = { id: editingQr.id || editingQr._id, name: qrName, design };
        if (type === 'static') {
             const error = validateStaticInput();
             if (error) return Swal.fire("Error", error, "error");

             body.content = getStaticData();
             body.type = staticType;
             body.metadata = getMetadata();
        } else {
             if (!targetUrl) return Swal.fire("Error", "Target URL is required", "error");
             body.shortId = editingQr.shortId;
             body.targetUrl = targetUrl;
        }

        try {
            const res = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            if (res.ok) {
                Swal.fire('Success', 'Updated successfully', 'success');
                setActiveView('folders');
                setEditingQr(null);
            } else {
                Swal.fire('Error', 'Failed to update', 'error');
            }
        } catch {
            Swal.fire('Error', 'Network error', 'error');
        }
    };

    const downloadItem = async (item, type) => {
        const data = type === 'static' ? item.content : `${window.location.origin}/qr/${item.shortId}`;
        if (!qrCode) return;
        qrCode.update({ data: data });
        await new Promise(r => setTimeout(r, 100)); 
        qrCode.download({ name: item.name || "qrcode", extension: "png" });
        qrCode.update({ data: getCurrentData() }); // Restore
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setLogoUrl(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const downloadQRCode = () => {
        if (frameStyle === 'none') {
            if (qrCode) qrCode.download({ name: qrName || "qrcode", extension: fileExt });
        } else {
            // If frame is active, we must screenshot the HTML
            if (frameRef.current) {
                html2canvas(frameRef.current, { 
                    backgroundColor: null,
                    scale: 2, // Higher resolution
                    logging: false,
                    useCORS: true 
                }).then(canvas => {
                    const link = document.createElement('a');
                    link.download = `${qrName || 'qrcode'}.${fileExt === 'svg' ? 'png' : fileExt}`; // Fallback to png for svg
                    link.href = canvas.toDataURL(`image/${fileExt === 'svg' ? 'png' : fileExt}`);
                    link.click();
                });
            }
        }
    };

    // UI Helper: Color Picker
    const ColorInput = ({ label, value, onChange }) => (
        <div className="flex flex-col gap-2 w-full">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
            <div className="flex items-center gap-3">
                <Popover placement="bottom" showArrow={true}>
                    <PopoverTrigger>
                        <div 
                            className="w-10 h-10 rounded-full shadow-sm border border-gray-200 transition-transform hover:scale-105 ring-2 ring-white dark:ring-gray-800 shrink-0 cursor-pointer"
                            style={{ backgroundColor: value }}
                        ></div>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 border-none shadow-xl rounded-xl bg-transparent">
                         <div className="p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                            <HexColorPicker color={value} onChange={onChange} />
                         </div>
                    </PopoverContent>
                </Popover>
                <Input 
                    size="sm" 
                    value={value} 
                    onChange={(e) => onChange(e.target.value)} 
                    className="flex-1" 
                    variant="bordered"
                    startContent={<span className="text-gray-400">#</span>}
                    maxLength={7}
                    classNames={{ inputWrapper: "bg-white shadow-sm" }}
                />
            </div>
        </div>
    );

    return (
        <div className="min-h-screen w-full bg-[#f8fafc] dark:bg-gray-950 p-4 md:p-8 font-sans">
            <Head><title>QR Manager | Arionys</title></Head>

            {/* Navigation Bar */}
            <div className="flex justify-center mb-8 sticky top-4 z-40">
                <div className="w-full max-w-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-1.5 rounded-2xl shadow-xl border border-white/20 grid grid-cols-2 gap-2">
                    <button 
                        onClick={() => {
                            setActiveView('create');
                            resetForm();
                        }}
                        className={`flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-300 font-bold text-sm tracking-wide ${
                            activeView === 'create' 
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                            : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                    >
                        <FaPlus className="text-xs" />
                        <span>CREATOR</span>
                    </button>
                    <button 
                        onClick={() => setActiveView('folders')}
                        className={`flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-300 font-bold text-sm tracking-wide ${
                            activeView === 'folders' 
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                            : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                    >
                        <FaFolder className="text-xs" />
                        <span>LIBRARY</span>
                    </button>
                </div>
            </div>

            <div className="max-w-[1600px] mx-auto">
                {activeView === 'create' && (
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                        {/* LEFT: Editor Panel */}
                        <div className="xl:col-span-8 space-y-6">
                            <Card className="shadow-2xl shadow-blue-900/5 border-none bg-white dark:bg-gray-900 rounded-3xl overflow-hidden">
                                <CardBody className="p-0">
                                    <div className="p-8 space-y-8">
                                        {/* --- CONTENT SECTION --- */}
                                        <div className="space-y-8">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
                                                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Create QR Code</h2>
                                                
                                                {/* Type Toggle Tabs */}
                                                <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                                    <button 
                                                        className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${qrType === 'static' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                                                        onClick={() => setQrType('static')}
                                                    >
                                                        Static
                                                    </button>
                                                    <button 
                                                        className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${qrType === 'dynamic' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                                                        onClick={() => setQrType('dynamic')}
                                                    >
                                                        Dynamic
                                                    </button>
                                                </div>
                                            </div>

                                            <Input 
                                                label="Name your QR Code" 
                                                placeholder="e.g. My Awesome QR" 
                                                value={qrName} 
                                                onChange={e => setQrName(e.target.value)} 
                                                variant="bordered"
                                                labelPlacement="outside"
                                                size="lg"
                                                fullWidth={true}
                                                classNames={{ 
                                                    mainWrapper: "w-full",
                                                    inputWrapper: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-500 focus-within:!border-blue-500 shadow-sm",
                                                    label: "text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                                                }}
                                            />

                                            <Divider className="my-6" />

                                            {qrType === 'static' ? (
                                                <div className="space-y-6">
                                                    {/* Static Type Selector Dropdown */}
                                                    <div className="flex flex-col gap-2">
                                                        <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Content Type</label>
                                                        <Select
                                                            selectedKeys={[staticType]}
                                                            onChange={(e) => { if (e.target.value) setStaticType(e.target.value); }}
                                                            variant="bordered"
                                                            size="lg"
                                                            classNames={{
                                                                mainWrapper: "w-full",
                                                                trigger: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-500 shadow-sm",
                                                            }}
                                                            startContent={
                                                                <div className="text-blue-500 text-xl mr-2 flex items-center justify-center w-6">
                                                                    {staticType === 'text' && <FaFont />}
                                                                    {staticType === 'url' && <FaLink />}
                                                                    {staticType === 'wifi' && <FaWifi />}
                                                                    {staticType === 'email' && <FaEnvelope />}
                                                                    {staticType === 'sms' && <FaSms />}
                                                                    {staticType === 'whatsapp' && <FaWhatsapp />}
                                                                    {staticType === 'event' && <FaCalendar />}
                                                                    {staticType === 'vcard' && <FaAddressCard />}
                                                                </div>
                                                            }
                                                        >
                                                        {[
                                                            { id: 'text', icon: FaFont, label: 'Text' },
                                                            { id: 'url', icon: FaLink, label: 'URL' },
                                                            { id: 'wifi', icon: FaWifi, label: 'Wi-Fi' },
                                                            { id: 'email', icon: FaEnvelope, label: 'Email' },
                                                            { id: 'sms', icon: FaSms, label: 'SMS' },
                                                            { id: 'whatsapp', icon: FaWhatsapp, label: 'WhatsApp' },
                                                            { id: 'event', icon: FaCalendar, label: 'Event' },
                                                            { id: 'vcard', icon: FaAddressCard, label: 'vCard' }
                                                        ].map(type => (
                                                            <SelectItem key={type.id} startContent={<type.icon className="text-lg text-gray-400" />} textValue={type.label}>
                                                                {type.label}
                                                            </SelectItem>
                                                        ))}
                                                    </Select>
                                                    </div>

                                                    {/* Dynamic Inputs based on Type */}
                                                    <div className="mt-8 space-y-6">
                                                        {staticType === 'text' && (
                                                            <Textarea 
                                                                label="Text Content" 
                                                                placeholder="Enter your text here..." 
                                                                value={inputValue} 
                                                                onChange={e => setInputValue(e.target.value)} 
                                                                variant="bordered"
                                                                labelPlacement="outside"
                                                                minRows={4}
                                                                fullWidth={true}
                                                                classNames={{
                                                                    mainWrapper: "w-full",
                                                                    input: "text-base",
                                                                    inputWrapper: "bg-white dark:bg-gray-800 border-gray-200 hover:border-blue-500 focus-within:!border-blue-500 shadow-sm transition-all duration-200",
                                                                    label: "font-semibold text-gray-700 dark:text-gray-300"
                                                                }}
                                                            />
                                                        )}
                                                        {staticType === 'url' && (
                                                            <Input 
                                                                label="Website URL" 
                                                                placeholder="https://example.com" 
                                                                value={inputValue} 
                                                                onChange={e => setInputValue(e.target.value)} 
                                                                variant="bordered"
                                                                labelPlacement="outside"
                                                                fullWidth={true}
                                                                startContent={<FaGlobe className="text-gray-400 text-lg mr-2"/>}
                                                                classNames={{
                                                                    mainWrapper: "w-full",
                                                                    inputWrapper: "bg-white dark:bg-gray-800 border-gray-200 hover:border-blue-500 focus-within:!border-blue-500 shadow-sm h-12",
                                                                    label: "font-semibold text-gray-700 dark:text-gray-300"
                                                                }}
                                                            />
                                                        )}
                                                        {staticType === 'wifi' && (
                                                            <div className="space-y-6 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
                                                                <h4 className="text-sm font-bold uppercase text-gray-400 tracking-wider mb-2">Network Details</h4>
                                                                <Input 
                                                                    label="Network Name (SSID)" 
                                                                    placeholder="e.g. MyHomeWiFi"
                                                                    value={wifiSsid} 
                                                                    onChange={e => setWifiSsid(e.target.value)} 
                                                                    variant="bordered"
                                                                    labelPlacement="outside"
                                                                    fullWidth={true}
                                                                    startContent={<FaWifi className="text-gray-400 mr-2"/>}
                                                                    classNames={{ mainWrapper: "w-full", inputWrapper: "bg-white shadow-sm" }}
                                                                />
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                    <Input 
                                                                        label="Password" 
                                                                        placeholder="••••••••"
                                                                        value={wifiPassword} 
                                                                        onChange={e => setWifiPassword(e.target.value)} 
                                                                        variant="bordered"
                                                                        labelPlacement="outside"
                                                                        fullWidth={true}
                                                                        type="password"
                                                                        classNames={{ mainWrapper: "w-full", inputWrapper: "bg-white shadow-sm" }}
                                                                    />
                                                                    <div className="flex flex-col gap-2">
                                                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Encryption</label>
                                                                        <Select 
                                                                            selectedKeys={[wifiEncryption]} 
                                                                            onChange={e => setWifiEncryption(e.target.value)} 
                                                                            variant="bordered"
                                                                            classNames={{ mainWrapper: "w-full", trigger: "bg-white shadow-sm" }}
                                                                        >
                                                                            <SelectItem key="WPA">WPA/WPA2</SelectItem>
                                                                            <SelectItem key="WEP">WEP</SelectItem>
                                                                            <SelectItem key="nopass">No Password</SelectItem>
                                                                        </Select>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-2 pt-2">
                                                                    <Switch isSelected={wifiHidden} onValueChange={setWifiHidden} size="sm" />
                                                                    <span className="text-sm text-gray-600 font-medium">Hidden Network</span>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {staticType === 'email' && (
                                                            <div className="space-y-6 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
                                                                <h4 className="text-sm font-bold uppercase text-gray-400 tracking-wider mb-2 flex items-center gap-2">
                                                                     <FaEnvelope className="text-blue-500"/> Email Details
                                                                </h4>
                                                                <Input 
                                                                    label="Email To" 
                                                                    placeholder="recipient@example.com"
                                                                    value={emailTo} 
                                                                    onChange={e => setEmailTo(e.target.value)} 
                                                                    variant="bordered"
                                                                    labelPlacement="outside"
                                                                    fullWidth={true}
                                                                    classNames={{ mainWrapper: "w-full", inputWrapper: "bg-white shadow-sm" }}
                                                                />
                                                                <Input 
                                                                    label="Subject" 
                                                                    placeholder="Hello there"
                                                                    value={emailSubject} 
                                                                    onChange={e => setEmailSubject(e.target.value)} 
                                                                    variant="bordered"
                                                                    labelPlacement="outside"
                                                                    fullWidth={true}
                                                                    classNames={{ mainWrapper: "w-full", inputWrapper: "bg-white shadow-sm" }}
                                                                />
                                                                <Textarea 
                                                                    label="Message Body" 
                                                                    placeholder="Type your message..."
                                                                    value={emailBody} 
                                                                    onChange={e => setEmailBody(e.target.value)} 
                                                                    variant="bordered"
                                                                    labelPlacement="outside"
                                                                    minRows={5}
                                                                    fullWidth={true}
                                                                    classNames={{ mainWrapper: "w-full", inputWrapper: "bg-white shadow-sm" }}
                                                                />
                                                            </div>
                                                        )}
                                                        {staticType === 'sms' && (
                                                            <div className="space-y-6 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
                                                                <h4 className="text-sm font-bold uppercase text-gray-400 tracking-wider mb-2 flex items-center gap-2">
                                                                     <FaSms className="text-green-500"/> SMS Details
                                                                </h4>
                                                                <Input 
                                                                    label="Phone Number" 
                                                                    placeholder="+1234567890"
                                                                    value={smsPhone} 
                                                                    onChange={e => setSmsPhone(e.target.value)} 
                                                                    variant="bordered"
                                                                    labelPlacement="outside"
                                                                    fullWidth={true}
                                                                    classNames={{ mainWrapper: "w-full", inputWrapper: "bg-white shadow-sm" }}
                                                                />
                                                                <Textarea 
                                                                    label="Message" 
                                                                    placeholder="I'm interested in..."
                                                                    value={smsMessage} 
                                                                    onChange={e => setSmsMessage(e.target.value)} 
                                                                    variant="bordered"
                                                                    labelPlacement="outside"
                                                                    minRows={4}
                                                                    fullWidth={true}
                                                                    classNames={{ mainWrapper: "w-full", inputWrapper: "bg-white shadow-sm" }}
                                                                />
                                                            </div>
                                                        )}
                                                        {staticType === 'whatsapp' && (
                                                            <div className="space-y-6 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
                                                                <h4 className="text-sm font-bold uppercase text-gray-400 tracking-wider mb-2 flex items-center gap-2">
                                                                     <FaWhatsapp className="text-green-600"/> WhatsApp Details
                                                                </h4>
                                                                <Input 
                                                                    label="WhatsApp Number" 
                                                                    placeholder="+1234567890"
                                                                    value={whatsappPhone} 
                                                                    onChange={e => setWhatsappPhone(e.target.value)} 
                                                                    variant="bordered"
                                                                    labelPlacement="outside"
                                                                    fullWidth={true}
                                                                    classNames={{ mainWrapper: "w-full", inputWrapper: "bg-white shadow-sm" }}
                                                                />
                                                                <Textarea 
                                                                    label="Message" 
                                                                    placeholder="Hello! I would like to..."
                                                                    value={whatsappMessage} 
                                                                    onChange={e => setWhatsappMessage(e.target.value)} 
                                                                    variant="bordered"
                                                                    labelPlacement="outside"
                                                                    minRows={4}
                                                                    fullWidth={true}
                                                                    classNames={{ mainWrapper: "w-full", inputWrapper: "bg-white shadow-sm" }}
                                                                />
                                                            </div>
                                                        )}
                                                        {staticType === 'event' && (
                                                            <div className="space-y-6 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
                                                                <h4 className="text-sm font-bold uppercase text-gray-400 tracking-wider mb-2 flex items-center gap-2">
                                                                     <FaCalendar className="text-orange-500"/> Event Details
                                                                </h4>
                                                                <Input 
                                                                    label="Event Title" 
                                                                    placeholder="Birthday Party"
                                                                    value={eventTitle} 
                                                                    onChange={e => setEventTitle(e.target.value)} 
                                                                    variant="bordered"
                                                                    labelPlacement="outside"
                                                                    fullWidth={true}
                                                                    classNames={{ mainWrapper: "w-full", inputWrapper: "bg-white shadow-sm" }}
                                                                />
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                    <div className="flex flex-col gap-2 w-full">
                                                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Start Time</label>
                                                                        <Input 
                                                                            type="datetime-local"
                                                                            aria-label="Start Time"
                                                                            value={eventStart} 
                                                                            onChange={e => setEventStart(e.target.value)} 
                                                                            variant="bordered"
                                                                            fullWidth={true}
                                                                            classNames={{ mainWrapper: "w-full", inputWrapper: "bg-white shadow-sm" }}
                                                                        />
                                                                    </div>
                                                                    <div className="flex flex-col gap-2 w-full">
                                                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">End Time</label>
                                                                        <Input 
                                                                            type="datetime-local"
                                                                            aria-label="End Time"
                                                                            value={eventEnd} 
                                                                            onChange={e => setEventEnd(e.target.value)} 
                                                                            variant="bordered"
                                                                            fullWidth={true}
                                                                            classNames={{ mainWrapper: "w-full", inputWrapper: "bg-white shadow-sm" }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <Input 
                                                                    label="Location" 
                                                                    placeholder="123 Party Lane, NY"
                                                                    value={eventLocation} 
                                                                    onChange={e => setEventLocation(e.target.value)} 
                                                                    variant="bordered"
                                                                    labelPlacement="outside"
                                                                    fullWidth={true}
                                                                    startContent={<FaMapMarkerAlt className="text-gray-400 mr-2"/>}
                                                                    classNames={{ mainWrapper: "w-full", inputWrapper: "bg-white shadow-sm" }}
                                                                />
                                                                <Textarea 
                                                                    label="Description" 
                                                                    placeholder="Join us for..."
                                                                    value={eventNote} 
                                                                    onChange={e => setEventNote(e.target.value)} 
                                                                    variant="bordered"
                                                                    labelPlacement="outside"
                                                                    minRows={3}
                                                                    classNames={{ mainWrapper: "w-full", inputWrapper: "bg-white shadow-sm" }}
                                                                />
                                                            </div>
                                                        )}
                                                        {staticType === 'vcard' && (
                                                            <div className="space-y-8">
                                                                <div className="p-5 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
                                                                    <h4 className="text-sm font-bold uppercase text-gray-500 tracking-wider mb-4 flex items-center gap-2">
                                                                        <FaUser className="text-blue-500"/> Personal Info
                                                                    </h4>
                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                                        <Input label="First Name" placeholder="John" value={vFirstName} onChange={e => setVFirstName(e.target.value)} variant="bordered" labelPlacement="outside" fullWidth={true} classNames={{ mainWrapper: "w-full", inputWrapper: "bg-white shadow-sm" }} />
                                                                        <Input label="Last Name" placeholder="Doe" value={vLastName} onChange={e => setVLastName(e.target.value)} variant="bordered" labelPlacement="outside" fullWidth={true} classNames={{ mainWrapper: "w-full", inputWrapper: "bg-white shadow-sm" }} />
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="p-5 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
                                                                    <h4 className="text-sm font-bold uppercase text-gray-500 tracking-wider mb-4 flex items-center gap-2">
                                                                        <FaPhone className="text-green-500"/> Contact Details
                                                                    </h4>
                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                                                        <Input label="Mobile" placeholder="+1..." value={vMobile} onChange={e => setVMobile(e.target.value)} variant="bordered" labelPlacement="outside" fullWidth={true} classNames={{ mainWrapper: "w-full", inputWrapper: "bg-white shadow-sm" }} />
                                                                        <Input label="Phone" placeholder="+1..." value={vPhone} onChange={e => setVPhone(e.target.value)} variant="bordered" labelPlacement="outside" fullWidth={true} classNames={{ mainWrapper: "w-full", inputWrapper: "bg-white shadow-sm" }} />
                                                                    </div>
                                                                    <div className="grid grid-cols-1 gap-5">
                                                                        <Input label="Email" placeholder="john@example.com" value={vEmail} onChange={e => setVEmail(e.target.value)} variant="bordered" labelPlacement="outside" fullWidth={true} classNames={{ mainWrapper: "w-full", inputWrapper: "bg-white shadow-sm" }} />
                                                                        <Input label="Website" placeholder="https://..." value={vWebsite} onChange={e => setVWebsite(e.target.value)} variant="bordered" labelPlacement="outside" fullWidth={true} classNames={{ mainWrapper: "w-full", inputWrapper: "bg-white shadow-sm" }} />
                                                                    </div>
                                                                </div>

                                                                <div className="p-5 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
                                                                    <h4 className="text-sm font-bold uppercase text-gray-500 tracking-wider mb-4 flex items-center gap-2">
                                                                        <FaBriefcase className="text-purple-500"/> Work
                                                                    </h4>
                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                                        <Input label="Company" placeholder="Acme Inc" value={vCompany} onChange={e => setVCompany(e.target.value)} variant="bordered" labelPlacement="outside" fullWidth={true} classNames={{ mainWrapper: "w-full", inputWrapper: "bg-white shadow-sm" }} />
                                                                        <Input label="Job Title" placeholder="Manager" value={vJob} onChange={e => setVJob(e.target.value)} variant="bordered" labelPlacement="outside" fullWidth={true} classNames={{ mainWrapper: "w-full", inputWrapper: "bg-white shadow-sm" }} />
                                                                    </div>
                                                                </div>

                                                                <div className="p-5 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
                                                                    <h4 className="text-sm font-bold uppercase text-gray-500 tracking-wider mb-4 flex items-center gap-2">
                                                                        <FaMapMarkerAlt className="text-red-500"/> Address
                                                                    </h4>
                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                                        <Input label="Street" value={vStreet} onChange={e => setVStreet(e.target.value)} variant="bordered" labelPlacement="outside" fullWidth={true} className="md:col-span-2" classNames={{ mainWrapper: "w-full", inputWrapper: "bg-white shadow-sm" }} />
                                                                        <Input label="City" value={vCity} onChange={e => setVCity(e.target.value)} variant="bordered" labelPlacement="outside" fullWidth={true} classNames={{ mainWrapper: "w-full", inputWrapper: "bg-white shadow-sm" }} />
                                                                        <Input label="State" value={vState} onChange={e => setVState(e.target.value)} variant="bordered" labelPlacement="outside" fullWidth={true} classNames={{ mainWrapper: "w-full", inputWrapper: "bg-white shadow-sm" }} />
                                                                        <Input label="Zip" value={vZip} onChange={e => setVZip(e.target.value)} variant="bordered" labelPlacement="outside" fullWidth={true} classNames={{ mainWrapper: "w-full", inputWrapper: "bg-white shadow-sm" }} />
                                                                        <Input label="Country" value={vCountry} onChange={e => setVCountry(e.target.value)} variant="bordered" labelPlacement="outside" fullWidth={true} classNames={{ mainWrapper: "w-full", inputWrapper: "bg-white shadow-sm" }} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="space-y-6">
                                                    <div className="bg-purple-50 dark:bg-purple-900/10 p-6 rounded-3xl border border-purple-100 dark:border-purple-800/30">
                                                        <div className="flex gap-4 items-start mb-6">
                                                            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl text-purple-600">
                                                                <FaLink className="text-xl" />
                                                            </div>
                                                            <div>
                                                                <h3 className="font-bold text-gray-800 dark:text-gray-100">Dynamic URL</h3>
                                                                <p className="text-sm text-gray-500">Edit the destination anytime without reprinting.</p>
                                                            </div>
                                                        </div>
                                                        <Input 
                                                            label="Target URL" 
                                                            placeholder="https://your-website.com/promo" 
                                                            value={targetUrl} 
                                                            onChange={e => setTargetUrl(e.target.value)} 
                                                            variant="bordered"
                                                            labelPlacement="outside"
                                                            fullWidth={true}
                                                            classNames={{ 
                                                                mainWrapper: "w-full",
                                                                inputWrapper: "bg-white dark:bg-gray-900" 
                                                            }}
                                                            startContent={<span className="text-gray-400 font-mono text-sm">https://</span>}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* --- DESIGN SECTION --- */}
                                        <div className="pt-8 border-t border-gray-100 dark:border-gray-800">
                                            <div className="flex justify-between items-center mb-6">
                                                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">3. Design the QR</h2>
                                                <Button 
                                                    size="sm" 
                                                    variant="light" 
                                                    color="danger" 
                                                    startContent={<FaUndo />}
                                                    onClick={() => applyTemplate({ config: { bgType: "solid", bgColor: "#ffffff", dotsType: "solid", dotsColor: "#000000", dotStyle: "square", cornerSquareStyle: "square", cornerDotStyle: "square", logoUrl: "" } })}
                                                >
                                                    Reset
                                                </Button>
                                            </div>

                                            <Accordion 
                                                selectionMode="multiple" 
                                                variant="splitted" 
                                                className="px-0 gap-4 w-full"
                                                itemClasses={{
                                                    base: "group border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm rounded-2xl overflow-hidden mb-2 w-full",
                                                    title: "font-bold text-gray-800 dark:text-white text-lg",
                                                    subtitle: "text-sm text-gray-400 font-normal",
                                                    trigger: "py-4 px-6",
                                                    content: "pb-6 px-6 pt-0",
                                                    indicator: "text-gray-400 group-hover:text-blue-500"
                                                }}
                                            >
                                                {/* FRAME SECTION */}
                                                <AccordionItem 
                                                    key="frame" 
                                                    aria-label="Frame" 
                                                    startContent={<div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg"><FaLayerGroup className="text-xl text-gray-600 dark:text-gray-400" /></div>}
                                                    title="Frame"
                                                    subtitle="Frames make your QR Code stand out from the crowd, inspiring more scans."
                                                >
                                                    <div className="pt-4 space-y-6">
                                                        <div>
                                                            <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">Frame style</p>
                                                            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                                                                {[
                                                                    { id: 'none', icon: <FaBan className="text-2xl text-gray-400" /> },
                                                                    { id: 'bottom-bar', icon: <div className="w-full h-full p-2 flex flex-col items-center justify-center"><div className="w-6 h-6 border border-gray-400 bg-white mb-1"></div><div className="w-8 h-1.5 bg-black rounded-full"></div></div> },
                                                                    { id: 'top-bar', icon: <div className="w-full h-full p-2 flex flex-col items-center justify-center"><div className="w-8 h-1.5 bg-black rounded-full mb-1"></div><div className="w-6 h-6 border border-gray-400 bg-white"></div></div> },
                                                                    { id: 'bottom-bubble', icon: <div className="w-full h-full p-2 flex flex-col items-center justify-center"><div className="w-6 h-6 border border-gray-400 bg-white mb-0.5"></div><div className="w-8 h-2 bg-black rounded-lg relative"><div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-2 border-l-transparent border-r-2 border-r-transparent border-b-2 border-b-black"></div></div></div> },
                                                                    { id: 'top-bubble', icon: <div className="w-full h-full p-2 flex flex-col items-center justify-center"><div className="w-8 h-2 bg-black rounded-lg relative mb-0.5"><div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-2 border-l-transparent border-r-2 border-r-transparent border-t-2 border-t-black"></div></div><div className="w-6 h-6 border border-gray-400 bg-white"></div></div> },
                                                                    { id: 'polaroid', icon: <div className="w-8 h-10 bg-white border border-gray-300 shadow-sm p-1 pb-3 flex flex-col"><div className="flex-1 bg-gray-100"></div></div> },
                                                                    { id: 'heavy-box', icon: <div className="w-8 h-8 border-4 border-black p-0.5"><div className="w-full h-full bg-gray-100"></div></div> },
                                                                    { id: 'scan-me-bottom', icon: <div className="w-8 h-9 border border-black p-0.5 relative"><div className="w-full h-6 bg-gray-100"></div><div className="absolute bottom-0 w-full text-[4px] bg-black text-white text-center leading-3">SCAN ME</div></div> },
                                                                    { id: 'scan-me-top', icon: <div className="w-8 h-9 border border-black p-0.5 relative pt-2"><div className="absolute top-0 w-full text-[4px] bg-black text-white text-center leading-3">SCAN ME</div><div className="w-full h-full bg-gray-100"></div></div> },
                                                                    { id: 'ribbon-bottom', icon: <div className="w-8 h-8 border border-gray-300 relative"><div className="w-full h-full bg-gray-100"></div><div className="absolute -bottom-1 left-0 w-full h-2 bg-black skew-x-[-10deg]"></div></div> },
                                                                    { id: 'phone', icon: <div className="w-6 h-10 border-2 border-black rounded-md flex flex-col items-center p-0.5"><div className="w-full h-full bg-gray-100"></div></div> },
                                                                    { id: 'laptop', icon: <div className="w-10 h-6 border-2 border-black rounded-sm flex flex-col items-center p-0.5"><div className="w-full h-full bg-gray-100"></div></div> },
                                                                ].map(frame => (
                                                                    <button 
                                                                        key={frame.id}
                                                                        onClick={() => setFrameStyle(frame.id)}
                                                                        className={`aspect-square rounded-xl border-2 flex items-center justify-center transition-all ${frameStyle === frame.id ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-800'}`}
                                                                    >
                                                                        {frame.icon}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {frameStyle !== 'none' && (
                                                            <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800 animate-in fade-in slide-in-from-top-4">
                                                                <Input 
                                                                    label="Frame Text" 
                                                                    value={frameText} 
                                                                    onChange={e => setFrameText(e.target.value)} 
                                                                    variant="bordered"
                                                                    labelPlacement="outside"
                                                                    maxLength={20}
                                                                    fullWidth={true}
                                                                    classNames={{ mainWrapper: "w-full", inputWrapper: "bg-white shadow-sm" }}
                                                                />
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <ColorInput label="Frame Color" value={frameColor} onChange={setFrameColor} />
                                                                    <ColorInput label="Text Color" value={frameTextColor} onChange={setFrameTextColor} />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </AccordionItem>

                                                {/* PATTERN SECTION */}
                                                <AccordionItem 
                                                    key="pattern" 
                                                    aria-label="Pattern" 
                                                    startContent={<div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg"><FaQrcode className="text-xl text-gray-600 dark:text-gray-400" /></div>}
                                                    title="QR Code Pattern"
                                                    subtitle="Choose a pattern for your QR code and select colors."
                                                >
                                                    <div className="pt-4 space-y-8">
                                                        
                                                        {/* Pattern Style */}
                                                        <div>
                                                            <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">Pattern style</p>
                                                            <div className="grid grid-cols-6 gap-3">
                                                                {[
                                                                    { id: 'square', icon: <div className="w-6 h-6 bg-current" /> },
                                                                    { id: 'rounded', icon: <div className="w-6 h-6 bg-current rounded-md" /> },
                                                                    { id: 'extra-rounded', icon: <div className="w-6 h-6 bg-current rounded-lg" /> },
                                                                    { id: 'dots', icon: <div className="w-6 h-6 bg-current rounded-full" /> },
                                                                    { id: 'classy', icon: <div className="w-6 h-6 bg-current rounded-tr-lg rounded-bl-lg" /> },
                                                                    { id: 'classy-rounded', icon: <div className="w-6 h-6 bg-current rounded-tr-xl rounded-bl-xl border-2 border-current" /> },
                                                                ].map(style => (
                                                                    <button 
                                                                        key={style.id}
                                                                        onClick={() => setDotStyle(style.id)}
                                                                        className={`aspect-square rounded-xl border-2 flex items-center justify-center transition-all ${dotStyle === style.id ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-600' : 'border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200'}`}
                                                                    >
                                                                        {style.icon}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <Divider className="my-2"/>

                                                        {/* Pattern Color */}
                                                        <div>
                                                            <div className="flex justify-between items-center mb-4">
                                                                <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">Pattern color</h4>
                                                            </div>
                                                            
                                                            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl space-y-4">
                                                                <div className="flex items-center justify-between">
                                                                    <span className="text-sm text-gray-600 dark:text-gray-400">Use a gradient pattern color</span>
                                                                    <Switch 
                                                                        size="sm" 
                                                                        isSelected={dotsType === 'gradient'} 
                                                                        onValueChange={(val) => setDotsType(val ? 'gradient' : 'solid')} 
                                                                    />
                                                                </div>

                                                                {dotsType === 'solid' ? (
                                                                    <ColorInput label="Pattern Color" value={dotsColor} onChange={setDotsColor} />
                                                                ) : (
                                                                    <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                                                                        <div className="grid grid-cols-2 gap-4">
                                                                            <ColorInput label="Start Color" value={dotsGradientColor1} onChange={setDotsGradientColor1} />
                                                                            <ColorInput label="End Color" value={dotsGradientColor2} onChange={setDotsGradientColor2} />
                                                                        </div>
                                                                        <div className="grid grid-cols-2 gap-4">
                                                                            <Select 
                                                                                label="Gradient Type" 
                                                                                selectedKeys={[dotsGradientType]} 
                                                                                onChange={e => setDotsGradientType(e.target.value)} 
                                                                                size="sm" 
                                                                                variant="bordered"
                                                                                labelPlacement="outside"
                                                                                className="bg-white dark:bg-gray-800"
                                                                            >
                                                                                <SelectItem key="linear">Linear</SelectItem>
                                                                                <SelectItem key="radial">Radial</SelectItem>
                                                                            </Select>
                                                                            <Slider 
                                                                                label="Rotation" 
                                                                                step={45} 
                                                                                minValue={0} 
                                                                                maxValue={360} 
                                                                                value={dotsGradientRotation} 
                                                                                onChange={setDotsGradientRotation} 
                                                                                size="sm" 
                                                                                className="max-w-full"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <Divider className="my-2"/>

                                                        {/* Pattern Background Color */}
                                                        <div>
                                                            <div className="flex justify-between items-center mb-4">
                                                                <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">Pattern background color</h4>
                                                            </div>

                                                            <div className="space-y-4">
                                                                <div className="flex items-center gap-2 mb-4">
                                                                    <div className={`w-5 h-5 rounded border flex items-center justify-center cursor-pointer transition-colors ${bgTransparent ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-300 bg-white'}`} onClick={() => setBgTransparent(!bgTransparent)}>
                                                                        {bgTransparent && <FaCheck className="text-xs" />}
                                                                    </div>
                                                                    <span className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer select-none" onClick={() => setBgTransparent(!bgTransparent)}>Transparent background</span>
                                                                </div>

                                                                <div className={`p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl space-y-4 transition-opacity ${bgTransparent ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                                                                    <div className="flex items-center justify-between">
                                                                        <span className="text-sm text-gray-600 dark:text-gray-400">Use a gradient background color</span>
                                                                        <Switch 
                                                                            size="sm" 
                                                                            isSelected={bgType === 'gradient'} 
                                                                            onValueChange={(val) => setBgType(val ? 'gradient' : 'solid')} 
                                                                            isDisabled={bgTransparent}
                                                                        />
                                                                    </div>

                                                                    {bgType === 'solid' ? (
                                                                        <ColorInput label="Background Color" value={bgColor} onChange={setBgColor} />
                                                                    ) : (
                                                                        <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                                                                            <div className="grid grid-cols-2 gap-4">
                                                                                <ColorInput label="Start Color" value={bgGradientColor1} onChange={setBgGradientColor1} />
                                                                                <ColorInput label="End Color" value={bgGradientColor2} onChange={setBgGradientColor2} />
                                                                            </div>
                                                                            <div className="grid grid-cols-2 gap-4">
                                                                                <Select 
                                                                                    label="Gradient Type" 
                                                                                    selectedKeys={[bgGradientType]} 
                                                                                    onChange={e => setBgGradientType(e.target.value)} 
                                                                                    size="sm" 
                                                                                    variant="bordered"
                                                                                    labelPlacement="outside"
                                                                                    className="bg-white dark:bg-gray-800"
                                                                                >
                                                                                    <SelectItem key="linear">Linear</SelectItem>
                                                                                    <SelectItem key="radial">Radial</SelectItem>
                                                                                </Select>
                                                                                <Slider 
                                                                                    label="Rotation" 
                                                                                    step={45} 
                                                                                    minValue={0} 
                                                                                    maxValue={360} 
                                                                                    value={bgGradientRotation} 
                                                                                    onChange={setBgGradientRotation} 
                                                                                    size="sm" 
                                                                                    className="max-w-full"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Warning Note */}
                                                        <div className="flex gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-800/50">
                                                            <div className="mt-0.5 w-5 h-5 flex items-center justify-center rounded border border-orange-400 text-orange-600 font-bold text-xs">!</div>
                                                            <p className="text-xs text-orange-700 dark:text-orange-300 leading-relaxed">
                                                                Remember! For optimal QR code reading results, we recommend using high-contrast colors.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </AccordionItem>

                                                {/* CORNERS SECTION */}
                                                <AccordionItem 
                                                    key="corners" 
                                                    aria-label="Corners" 
                                                    startContent={<div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg"><FaShapes className="text-xl text-gray-600 dark:text-gray-400" /></div>}
                                                    title="QR Code Corners"
                                                    subtitle="Select your QR code's corner style"
                                                >
                                                    <div className="pt-4 space-y-6">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                            <div className="flex flex-col gap-2">
                                                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Corner Square Style</label>
                                                                <Select 
                                                                    selectedKeys={[cornerSquareStyle]} 
                                                                    onChange={e => setCornerSquareStyle(e.target.value)} 
                                                                    variant="bordered" 
                                                                    classNames={{ mainWrapper: "w-full", trigger: "bg-white shadow-sm" }}
                                                                >
                                                                    <SelectItem key="square">Square</SelectItem>
                                                                    <SelectItem key="dot">Dot</SelectItem>
                                                                    <SelectItem key="extra-rounded">Extra Rounded</SelectItem>
                                                                </Select>
                                                            </div>
                                                            <div className="flex flex-col gap-2">
                                                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Corner Dot Style</label>
                                                                <Select 
                                                                    selectedKeys={[cornerDotStyle]} 
                                                                    onChange={e => setCornerDotStyle(e.target.value)} 
                                                                    variant="bordered" 
                                                                    classNames={{ mainWrapper: "w-full", trigger: "bg-white shadow-sm" }}
                                                                >
                                                                    <SelectItem key="square">Square</SelectItem>
                                                                    <SelectItem key="dot">Dot</SelectItem>
                                                                </Select>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="flex items-center justify-between">
                                                            <h4 className="text-sm font-bold text-gray-600">Custom Eye Colors</h4>
                                                            <Switch size="sm" isSelected={useCustomEyeColors} onValueChange={setUseCustomEyeColors}>Enable</Switch>
                                                        </div>
                                                        
                                                        {useCustomEyeColors && (
                                                            <div className="grid grid-cols-2 gap-6">
                                                                <ColorInput label="Square Color" value={cornerSquareColor} onChange={setCornerSquareColor} />
                                                                <ColorInput label="Inner Dot Color" value={cornerDotColor} onChange={setCornerDotColor} />
                                                            </div>
                                                        )}
                                                    </div>
                                                </AccordionItem>

                                                {/* LOGO SECTION */}
                                                <AccordionItem 
                                                    key="logo" 
                                                    aria-label="Logo" 
                                                    startContent={<div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg"><FaImage className="text-xl text-gray-600 dark:text-gray-400" /></div>}
                                                    title="Add Logo"
                                                    subtitle="Make your QR code unique by adding your logo or an image"
                                                >
                                                    <div className="pt-4 space-y-6">
                                                        <div className="flex flex-col md:flex-row gap-6 items-start">
                                                            <div className="relative group w-24 h-24 flex-shrink-0">
                                                                <div className="w-full h-full rounded-xl bg-gray-50 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                                                                    {logoUrl ? <img src={logoUrl} className="w-full h-full object-contain p-1" /> : <FaImage className="text-gray-300 text-2xl" />}
                                                                </div>
                                                                {logoUrl && (
                                                                    <button onClick={() => setLogoUrl("")} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md">
                                                                        <FaTrash className="text-[10px]" />
                                                                    </button>
                                                                )}
                                                            </div>
                                                            <div className="flex-1 w-full space-y-4">
                                                                <input type="file" accept="image/*" onChange={handleLogoUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <Slider label="Size" step={0.05} minValue={0.1} maxValue={0.5} value={logoSize} onChange={setLogoSize} size="sm" />
                                                                    <Slider label="Margin" step={1} minValue={0} maxValue={20} value={logoMargin} onChange={setLogoMargin} size="sm" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </AccordionItem>

                                                {/* SETTINGS SECTION (Moved from top) */}
                                                <AccordionItem 
                                                    key="settings" 
                                                    aria-label="Settings" 
                                                    startContent={<div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg"><FaCrop className="text-xl text-gray-600 dark:text-gray-400" /></div>}
                                                    title="Size & Settings"
                                                    subtitle="Adjust resolution, margins, and error correction"
                                                >
                                                    <div className="pt-4 space-y-6">
                                                        <div className="flex gap-4 items-center">
                                                            <Slider label="Resolution" step={50} minValue={200} maxValue={2000} value={size} onChange={setSize} className="flex-1" />
                                                            <Input type="number" value={size} onChange={e => setSize(Number(e.target.value))} className="w-20" variant="bordered" size="sm" />
                                                        </div>
                                                        <div className="flex gap-4 items-center">
                                                            <Slider label="Quiet Zone" step={1} minValue={0} maxValue={50} value={margin} onChange={setMargin} className="flex-1" />
                                                            <Input type="number" value={margin} onChange={e => setMargin(Number(e.target.value))} className="w-20" variant="bordered" size="sm" />
                                                        </div>
                                                        <div className="flex flex-col gap-2">
                                                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Error Correction</label>
                                                            <Select 
                                                                selectedKeys={[errorLevel]} 
                                                                onChange={e => setErrorLevel(e.target.value)} 
                                                                variant="bordered" 
                                                                classNames={{ mainWrapper: "w-full", trigger: "bg-white shadow-sm" }}
                                                            >
                                                                <SelectItem key="L">Low (7%)</SelectItem>
                                                                <SelectItem key="M">Medium (15%)</SelectItem>
                                                                <SelectItem key="Q">Quartile (25%)</SelectItem>
                                                                <SelectItem key="H">High (30%)</SelectItem>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                </AccordionItem>
                                            </Accordion>
                                        </div>

                                        {/* --- ACTIONS SECTION --- */}
                                        <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-3 sticky bottom-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-4 -mx-8 -mb-8 rounded-b-3xl z-10">
                                             <Button 
                                                 size="lg" 
                                                 color={qrType === 'static' ? "primary" : "secondary"}
                                                 className={`w-full font-bold text-lg shadow-xl ${qrType === 'static' ? 'shadow-blue-500/30' : 'shadow-purple-500/30'}`}
                                                 onClick={editingQr ? handleUpdate : handleCreate}
                                             >
                                                 {editingQr 
                                                    ? (qrType === 'static' ? "Update Static QR" : "Update Dynamic QR")
                                                    : (qrType === 'static' ? "Create Static QR Code" : "Generate Dynamic QR")
                                                 }
                                             </Button>
                                             {editingQr && (
                                                 <Button size="lg" variant="flat" color="danger" onClick={() => { setEditingQr(null); setActiveView('folders'); setQrName(""); setInputValue(""); setTargetUrl(""); }}>
                                                     Cancel Edit
                                                 </Button>
                                             )}
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>

                        {/* RIGHT: Preview Panel */}
                        <div className="xl:col-span-4 sticky top-32">
                            <div className="flex flex-col items-center gap-6">
                                {/* Phone Mockup */}
                                <div className="relative w-[300px] h-[600px] bg-gray-900 rounded-[50px] shadow-2xl border-[14px] border-gray-900 overflow-hidden ring-1 ring-gray-900/50">
                                    {/* Notch */}
                                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-2xl z-20"></div>
                                    
                                    {/* Screen */}
                                    <div className="w-full h-full bg-white relative flex flex-col">
                                        {/* Status Bar */}
                                        <div className="h-12 flex justify-between items-center px-6 pt-2 text-gray-900 text-xs font-bold z-10">
                                            <span>9:41</span>
                                            <div className="flex gap-1.5">
                                                <FaWifi />
                                                <div className="w-6 h-3 bg-gray-900 rounded-[2px] opacity-80 relative overflow-hidden">
                                                    <div className="absolute top-0 left-0 h-full w-[70%] bg-white"></div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 flex flex-col items-center justify-center p-8 gap-8">
                                            <div className="text-center space-y-2">
                                                <div className="w-16 h-16 bg-gray-100 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-sm">
                                                    <FaQrcode className="text-3xl text-gray-400" />
                                                </div>
                                                <h3 className="font-bold text-2xl text-gray-900">Scan QR Code</h3>
                                                <p className="text-sm text-gray-500 px-4">Point your camera at the QR code to access content</p>
                                            </div>

                                            {/* The QR Container */}
                                            <div className={`transform transition-transform hover:scale-105 duration-300 ${frameStyle === 'none' ? 'p-4 bg-white rounded-2xl shadow-lg border border-gray-100' : ''}`}>
                                                <div ref={frameRef} className="inline-block">
                                                    <FrameWrapper 
                                                        frameStyle={frameStyle} 
                                                        frameText={frameText} 
                                                        frameColor={frameColor} 
                                                        frameTextColor={frameTextColor}
                                                    >
                                                        <div ref={qrRef} className="rounded-lg overflow-hidden" />
                                                    </FrameWrapper>
                                                </div>
                                            </div>

                                            <div className="w-full px-8">
                                                <div className="h-1 w-20 bg-gray-200 rounded-full mx-auto"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Download Options (Outside Phone) */}
                                <Card className="w-full max-w-[300px] shadow-lg border-none bg-white dark:bg-gray-800">
                                    <CardBody className="p-4 space-y-4">
                                        <div className="flex gap-2">
                                            <Select 
                                                className="w-32" 
                                                selectedKeys={[fileExt]} 
                                                onChange={e => setFileExt(e.target.value)}
                                                size="sm"
                                                variant="bordered"
                                            >
                                                <SelectItem key="png" value="png">PNG</SelectItem>
                                                <SelectItem key="svg" value="svg">SVG</SelectItem>
                                                <SelectItem key="jpeg" value="jpeg">JPEG</SelectItem>
                                                <SelectItem key="webp" value="webp">WEBP</SelectItem>
                                            </Select>
                                            <Button 
                                                className="flex-1 font-bold text-white shadow-lg shadow-green-500/20 bg-gradient-to-r from-emerald-500 to-teal-600"
                                                startContent={<FaDownload />} 
                                                onClick={downloadQRCode}
                                            >
                                                Download
                                            </Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                        </div>
                    </div>
                )}

                {activeView === 'folders' && (
                    <div className="space-y-8 animate-in fade-in duration-500">
                        {/* Stats Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg border-none">
                                <CardBody className="flex flex-row items-center justify-between p-6">
                                    <div>
                                        <p className="text-sm opacity-80 font-medium uppercase tracking-wider">Total QRs</p>
                                        <h3 className="text-3xl font-bold mt-1">{staticList.length + dynamicList.length}</h3>
                                    </div>
                                    <div className="p-3 bg-white/20 rounded-lg">
                                        <FaQrcode className="text-2xl" />
                                    </div>
                                </CardBody>
                            </Card>
                            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg border-none">
                                <CardBody className="flex flex-row items-center justify-between p-6">
                                    <div>
                                        <p className="text-sm opacity-80 font-medium uppercase tracking-wider">Total Scans</p>
                                        <h3 className="text-3xl font-bold mt-1">
                                            {dynamicList.reduce((acc, curr) => acc + (curr.clicks || 0), 0)}
                                        </h3>
                                    </div>
                                    <div className="p-3 bg-white/20 rounded-lg">
                                        <FaChartBar className="text-2xl" />
                                    </div>
                                </CardBody>
                            </Card>
                            <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg border-none">
                                <CardBody className="flex flex-row items-center justify-between p-6">
                                    <div>
                                        <p className="text-sm opacity-80 font-medium uppercase tracking-wider">Active Type</p>
                                        <h3 className="text-2xl font-bold mt-1 capitalize">{folderTab}</h3>
                                    </div>
                                    <div className="p-3 bg-white/20 rounded-lg">
                                        <FaFolder className="text-2xl" />
                                    </div>
                                </CardBody>
                            </Card>
                        </div>

                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                                My QR Codes
                                <Button isIconOnly size="sm" variant="light" onClick={refreshLists} isLoading={loading}>
                                    <FaSync />
                                </Button>
                            </h2>
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm border border-gray-200 dark:border-gray-700">
                                <Tabs 
                                    selectedKey={folderTab} 
                                    onSelectionChange={setFolderTab} 
                                    color="secondary" 
                                    variant="light"
                                    size="sm"
                                >
                                    <Tab key="static" title="Static QRs" />
                                    <Tab key="dynamic" title="Dynamic QRs" />
                                </Tabs>
                            </div>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {[1,2,3,4].map(i => (
                                    <Card key={i} className="h-48 animate-pulse bg-gray-200 dark:bg-gray-800 border-none" />
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {(folderTab === 'static' ? staticList : dynamicList).map(item => (
                                <Card key={item.id || item._id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-none bg-white dark:bg-gray-900 group">
                                    <CardBody className="p-5">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300">
                                                <FaQrcode className="text-xl" />
                                            </div>
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                                <Tooltip content="Edit">
                                                    <Button isIconOnly size="sm" variant="flat" onClick={() => handleEdit(item, folderTab)}>
                                                        <FaPen className="text-blue-500" />
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip content="Delete">
                                                    <Button isIconOnly size="sm" variant="flat" color="danger" onClick={() => handleDelete(item.id || item._id, folderTab)}>
                                                        <FaTrash />
                                                    </Button>
                                                </Tooltip>
                                            </div>
                                        </div>
                                        
                                        <h3 className="font-bold text-lg text-gray-800 dark:text-white truncate mb-1">{item.name}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate mb-4">
                                            {folderTab === 'static' ? item.content : item.targetUrl}
                                        </p>
                                        
                                        <Divider className="my-3" />
                                        
                                        <div className="flex justify-between items-center">
                                            {folderTab === 'dynamic' && (
                                                <span className="text-xs font-mono bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded">
                                                    /qr/{item.shortId}
                                                </span>
                                            )}
                                            {folderTab === 'static' && <span className="text-xs text-gray-400">Static</span>}
                                            
                                            <Button 
                                                size="sm" 
                                                variant="light" 
                                                color="success" 
                                                startContent={<FaDownload />} 
                                                onClick={() => downloadItem(item, folderTab)}
                                            >
                                                Download
                                            </Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            ))}
                            {(folderTab === 'static' ? staticList : dynamicList).length === 0 && !loading && (
                                <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white/50 dark:bg-gray-900/50 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700">
                                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-full mb-4">
                                        <FaFolder className="text-4xl text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300">No QR Codes Found</h3>
                                    <p className="text-gray-400 mt-2">Create your first QR code to get started</p>
                                    <Button className="mt-6" color="primary" onClick={() => setActiveView('create')}>
                                        Create New QR
                                    </Button>
                                </div>
                            )}
                        </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default QrCodeGenerator;
