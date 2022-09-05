module.exports = (mongoose) => {
    const translationSchema = new mongoose.Schema({ 
        dataset: {
            type: String,
            required: true
        },
        aa: String,
        ab: String,
        abe: String,
        abq: String,
        abs: String,
        ace: String,
        adx: String,
        ady: String,
        aeb: String,
        af: String,
        agq: String,
        ak: String,
        akl: String,
        akz: String,
        aln: String,
        als: String,
        alt: String,
        am: String,
        ami: String,
        an: String,
        anp: String,
        aoc: String,
        ar: String,
        arn: String,
        arq: String,
        ary: String,
        arz: String,
        as: String,
        ase: String,
        ast: String,
        atj: String,
        av: String,
        avk: String,
        awa: String,
        ay: String,
        az: String,
        azb: String,
        ba: String,
        ban: String,
        bar: String,
        'bat-smg': String,
        bbc: String,
        bcc: String,
        bcl: String,
        bdr: String,
        be: String,
        bej: String,
        bfi: String,
        bfq: String,
        bg: String,
        bgn: String,
        bh: String,
        bi: String,
        bjn: String,
        bla: String,
        bm: String,
        bn: String,
        bnn: String,
        bo: String,
        bpy: String,
        bqi: String,
        br: String,
        brh: String,
        brx: String,
        bsk: String,
        bss: String,
        btm: String,
        bto: String,
        bug: String,
        bxr: String,
        byq: String,
        bzg: String,
        bzs: String,
        ca: String,
        cak: String,
        cal: String,
        'cbk-zam': String,
        ccp: String,
        cdo: String,
        ce: String,
        ceb: String,
        ch: String,
        chn: String,
        cho: String,
        chr: String,
        chy: String,
        ckb: String,
        ckt: String,
        ckv: String,
        clc: String,
        cnh: String,
        co: String,
        cop: String,
        cps: String,
        cpx: String,
        cr: String,
        crh: String,
        crl: String,
        crs: String,
        cs: String,
        csb: String,
        ctg: String,
        cu: String,
        cv: String,
        cy: String,
        da: String,
        dag: String,
        dar: String,
        de: String,
        'de-at': String,
        'de-ch': String,
        din: String,
        diq: String,
        dru: String,
        dsb: String,
        dtp: String,
        dty: String,
        dua: String,
        dv: String,
        dz: String,
        ee: String,
        efi: String,
        egl: String,
        el: String,
        eml: String,
        en: String,
        'en-ca': String,
        eo: String,
        es: String,
        esu: String,
        et: String,
        ett: String,
        eu: String,
        ext: String,
        eya: String,
        fa: String,
        'fa-af': String,
        ff: String,
        fi: String,
        fit: String,
        'fiu-vro': String,
        fj: String,
        fkv: String,
        fo: String,
        fon: String,
        fos: String,
        fr: String,
        frc: String,
        fro: String,
        frp: String,
        frr: String,
        fuf: String,
        fur: String,
        fy: String,
        ga: String,
        gaa: String,
        gag: String,
        gan: String,
        gcf: String,
        gcr: String,
        gd: String,
        gez: String,
        gil: String,
        gl: String,
        glk: String,
        gmh: String,
        gn: String,
        goh: String,
        gom: String,
        gor: String,
        got: String,
        gpe: String,
        grc: String,
        gsg: String,
        gsw: String,
        'gsw-fr': String,
        gu: String,
        guc: String,
        guw: String,
        gv: String,
        ha: String,
        hai: String,
        hak: String,
        haw: String,
        hbo: String,
        he: String,
        hi: String,
        hif: String,
        hil: String,
        ho: String,
        hoc: String,
        hrx: String,
        hsb: String,
        ht: String,
        hu: String,
        'hu-formal': String,
        hy: String,
        hyw: String,
        hz: String,
        ia: String,
        id: String,
        ie: String,
        ig: String,
        ii: String,
        ik: String,
        ilo: String,
        inh: String,
        ins: String,
        io: String,
        is: String,
        it: String,
        iu: String,
        ja: String,
        jam: String,
        jax: String,
        jv: String,
        ka: String,
        kaa: String,
        kab: String,
        kae: String,
        kbd: String,
        kbg: String,
        kbp: String,
        kcg: String,
        kea: String,
        kg: String,
        kha: String,
        khg: String,
        khw: String,
        ki: String,
        kiu: String,
        kj: String,
        kjh: String,
        kjp: String,
        kk: String,
        'kk-cn': String,
        'kk-kz': String,
        'kk-tr': String,
        kl: String,
        km: String,
        kn: String,
        ko: String,
        koi: String,
        koy: String,
        kr: String,
        krc: String,
        kri: String,
        krj: String,
        krl: String,
        krx: String,
        ks: String,
        ksh: String,
        ksw: String,
        ku: String,
        kum: String,
        kut: String,
        kv: String,
        kw: String,
        ky: String,
        la: String,
        lad: String,
        lag: String,
        lb: String,
        lbe: String,
        lez: String,
        lfn: String,
        lg: String,
        li: String,
        lij: String,
        liv: String,
        lki: String,
        lkt: String,
        lld: String,
        lmo: String,
        ln: String,
        lo: String,
        loz: String,
        lrc: String,
        lt: String,
        ltg: String,
        lus: String,
        luz: String,
        lv: String,
        lvk: String,
        lzz: String,
        mad: String,
        mai: String,
        'map-bms': String,
        mdf: String,
        mfe: String,
        mg: String,
        mh: String,
        mhr: String,
        mi: String,
        mic: String,
        min: String,
        mis: String,
        mk: String,
        ml: String,
        mn: String,
        mnc: String,
        mni: String,
        mnw: String,
        mo: String,
        moe: String,
        mr: String,
        mrh: String,
        mrj: String,
        ms: String,
        mt: String,
        mui: String,
        mus: String,
        mwl: String,
        mwv: String,
        my: String,
        myv: String,
        mzn: String,
        na: String,
        nah: String,
        nan: String,
        nap: String,
        nb: String,
        nds: String,
        ne: String,
        new: String,
        ng: String,
        nia: String,
        niu: String,
        nl: String,
        nn: String,
        no: String,
        nod: String,
        nog: String,
        nov: String,
        nqo: String,
        nr: String,
        'nrf-gg': String,
        'nrf-je': String,
        nrm: String,
        nsk: String,
        nso: String,
        nui: String,
        nv: String,
        nxm: String,
        ny: String,
        nys: String,
        oc: String,
        oj: String,
        olo: String,
        om: String,
        ood: String,
        or: String,
        os: String,
        osa: String,
        otk: String,
        ovd: String,
        pa: String,
        pag: String,
        pam: String,
        pap: String,
        pcd: String,
        pdc: String,
        pdt: String,
        peo: String,
        pfl: String,
        pi: String,
        pih: String,
        pis: String,
        pjt: String,
        pko: String,
        pl: String,
        pms: String,
        pmy: String,
        pnb: String,
        pnt: String,
        ppu: String,
        prg: String,
        ps: String,
        pt: String,
        pwn: String,
        pyu: String,
        qu: String,
        quc: String,
        qug: String,
        qya: String,
        rar: String,
        rcf: String,
        rgn: String,
        rif: String,
        rki: String,
        rkt: String,
        rm: String,
        rmc: String,
        rmf: String,
        rmy: String,
        rn: String,
        ro: String,
        ru: String,
        'ru-sib': String,
        rue: String,
        rup: String,
        ruq: String,
        rw: String,
        rwr: String,
        ryu: String,
        sa: String,
        sah: String,
        sat: String,
        sc: String,
        scn: String,
        sco: String,
        sd: String,
        sdc: String,
        sdh: String,
        se: String,
        sei: String,
        ses: String,
        sg: String,
        sh: String,
        shi: String,
        shn: String,
        shy: String,
        si: String,
        sid: String,
        sjd: String,
        sje: String,
        sjm: String,
        sjn: String,
        sjt: String,
        sju: String,
        sk: String,
        skr: String,
        sl: String,
        sli: String,
        sm: String,
        sma: String,
        smj: String,
        smn: String,
        sms: String,
        sn: String,
        so: String,
        sou: String,
        sq: String,
        srn: String,
        srq: String,
        ss: String,
        ssf: String,
        st: String,
        stq: String,
        sty: String,
        su: String,
        sv: String,
        sw: String,
        sxr: String,
        syc: String,
        szl: String,
        szy: String,
        ta: String,
        tay: String,
        tce: String,
        tcy: String,
        te: String,
        tet: String,
        tg: String,
        th: String,
        ti: String,
        tk: String,
        tl: String,
        tlh: String,
        tli: String,
        tly: String,
        tn: String,
        to: String,
        tpi: String,
        tr: String,
        tru: String,
        trv: String,
        ts: String,
        tsg: String,
        tsk: String,
        tsu: String,
        tt: String,
        ttm: String,
        tum: String,
        tvl: String,
        tvn: String,
        tw: String,
        ty: String,
        tyv: String,
        tzl: String,
        tzm: String,
        udm: String,
        ug: String,
        uk: String,
        umu: String,
        und: String,
        ur: String,
        uun: String,
        uz: String,
        uzs: String,
        ve: String,
        vec: String,
        vep: String,
        vi: String,
        vls: String,
        vmf: String,
        vo: String,
        vot: String,
        wa: String,
        wal: String,
        war: String,
        wbl: String,
        wls: String,
        wo: String,
        wuu: String,
        wym: String,
        xal: String,
        xh: String,
        xmf: String,
        xnb: String,
        xpu: String,
        xsy: String,
        yai: String,
        yap: String,
        yav: String,
        ydg: String,
        yi: String,
        yo: String,
        yoi: String,
        yrk: String,
        yrl: String,
        za: String,
        zea: String,
        zgh: String,
        zh: String,
        'zh-min-nan': String,
        'zh-mo': String,
        'zh-tw': String,
        'zh-yue': String,
        zu: String,
        zun: String,
        createdAt: { 
            type: Date,
            default: Date.now()
        },
        updatedAt: { 
            type: Date
        }
    });
    translationSchema.pre('save', (next) =>{
        this.updatedAt = Date.now()
        next()
    })
    return mongoose.model('Translation', translationSchema);
}