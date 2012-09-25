// SGP4 propagation of ISS (ID 25544) in 1-minute increments.
// Lines: minute, x, y, z, vx, vy, vz; some extra stuff...
// Units: Km, Km/sec (?) (warning: Cesium wants m, not Km)
// Returns: list of minute, x,y,z, vx, vy, vz

var issPoints = function () {
    var iss_lines = [
        "0.00000000    3639.15675015    2164.36759595    5288.12567790 -3.298895550  6.903779640 -0.553581387",
        "1.00000000    3433.00438559    2573.29785076    5242.73792301 -3.570223747  6.722015877 -0.958769067    6775.952028 0.000354   51.62420  292.24889   46.78253   52.40682   52.37467",
        "2.00000000    3211.05874781    2970.38987477    5173.16198569 -3.825137200  6.509320511 -1.359548347    6776.260578 0.000442   51.62523  292.24221   45.85865   57.22772   57.18513",
        "3.00000000    2974.34017997    3353.81623635    5079.71773558 -4.062466444  6.266665115 -1.754077268    6776.668431 0.000533   51.62659  292.23574   47.53444   59.44872   59.39609",
        "4.00000000    2723.93683962    3721.81191931    4962.83477304 -4.281121329  5.995158027 -2.140541371    6777.168059 0.000625   51.62826  292.22953   50.67396   60.20572   60.14356",
        "5.00000000    2460.99979009    4072.68239323    4823.05053800 -4.480095977  5.696039747 -2.517161757    6777.750240 0.000716   51.63020  292.22364   54.67728   60.09859   60.02749",
        "6.00000000    2186.73780337    4404.81139109    4661.00793728 -4.658473439  5.370677774 -2.882203072    6778.404228 0.000804   51.63239  292.21811   59.20624   59.46545   59.38610",
        "7.00000000    1902.41189271    4716.66836046    4477.45249595 -4.815430041  5.020560883 -3.233981382    6779.117950 0.000889   51.63477  292.21297   64.05732   58.50978   58.42293",
        "8.00000000    1609.32959502    5006.81555445    4273.22903967 -4.950239371  4.647292825 -3.570871926    6779.878228 0.000969   51.63731  292.20826   69.10083   57.36122   57.26770",
        "9.00000000    1308.83902432    5273.91472830    4049.27791707 -5.062275908  4.252585475 -3.891316685    6780.671025 0.001044   51.63996  292.20401   74.25006   56.10645   56.00714",
        "10.00000000    1002.32271954    5516.73340784    3806.63077305 -5.151018246  3.838251417 -4.193831761    6781.481701 0.001113   51.64267  292.20021   79.44457   54.80588   54.70170",
        "11.00000000     691.19131157    5734.15069672    3546.40588667 -5.216051881  3.406195973 -4.477014506    6782.295285 0.001174   51.64539  292.19689   84.64060   53.50325   53.39515",
        "12.00000000     376.87703645    5925.16258946    3269.80308942 -5.257071547  2.958408716 -4.739550356    6783.096754 0.001227   51.64806  292.19403   89.80521   52.23148   52.12042",
        "13.00000000      60.82712330    6088.88675948    2978.09828293 -5.273883046  2.496954455 -4.980219336    6783.871307 0.001270   51.65065  292.19164   94.91249   51.01648   50.90342",
        "14.00000000    -255.50291238    6224.56679194    2672.63757767 -5.266404567  2.023963759 -5.197902176    6784.604645 0.001303   51.65310  292.18968   99.94084   49.87983   49.76573",
        "15.00000000    -570.65603817    6331.57583420    2354.83107745 -5.234667451  1.541623030 -5.391585985    6785.283232 0.001325   51.65536  292.18812  104.87098   48.84082   48.72660",
        "16.00000000    -883.18050303    6409.41963863    2026.14633744 -5.178816388  1.052164196 -5.560369452    6785.894549 0.001335   51.65741  292.18695  109.68417   47.91817   47.80475",
        "17.00000000   -1191.63662985    6457.73897606    1688.10152635 -5.099109023  0.557854055 -5.703467500    6786.427326 0.001332   51.65919  292.18610  114.36056   47.13177   47.01998",
        "18.00000000   -1494.60356629    6476.31140137    1342.25832610 -4.995914962  0.060983351 -5.820215369    6786.871749 0.001316   51.66067  292.18553  118.87731   46.50446   46.39510",
        "19.00000000   -1790.68595771    6465.05235690     990.21460517 -4.869714167 -0.436144354 -5.910072086    6787.219647 0.001288   51.66184  292.18520  123.20633   46.06434   45.95814",
        "20.00000000   -2078.52050551    6424.01560346     633.59690366 -4.721094747 -0.931223945 -5.972623264    6787.464637 0.001246   51.66266  292.18504  127.31119   45.84787   45.74550",
        "21.00000000   -2356.78237455    6353.39297342     274.05277054 -4.550750141 -1.421960072 -6.007583235    6787.602244 0.001191   51.66312  292.18498  131.14256   45.90441   45.80644",
        "22.00000000   -2624.19141400    6253.51344526     -86.75700543 -4.359475717 -1.906078437 -6.014796463    6787.629983 0.001124   51.66321  292.18498  134.63127   46.30315   46.21008",
        "23.00000000   -2879.51815689    6124.84154347    -447.16622810 -4.148164808 -2.381336976 -5.994238247    6787.547402 0.001045   51.66294  292.18496  137.67711   47.14433   47.05658",
        "24.00000000   -3121.58956522    5967.97507318    -805.51114630 -3.917804202 -2.845536848 -5.946014688    6787.356087 0.000956   51.66231  292.18486  140.13003   48.57804   48.49592",
        "25.00000000   -3349.29448937    5783.64220320   -1160.13828270 -3.669469134 -3.296533155 -5.870361940    6787.059629 0.000858   51.66132  292.18462  141.75769   50.83665   50.76042",
        "26.00000000   -3561.58881275    5572.69791613   -1509.41219591 -3.404317811 -3.732245308 -5.767644742    6786.663558 0.000755   51.66000  292.18418  142.18832   54.29196   54.22176",
        "27.00000000   -3757.50025519    5336.11984851   -1851.72313372 -3.123585522 -4.150666991 -5.638354257    6786.175232 0.000649   51.65837  292.18348  140.81277   59.55316   59.48906",
        "28.00000000   -3936.13281141    5075.00354800   -2185.49453647 -2.828578375 -4.549875625 -5.483105241    6785.603700 0.000548   51.65646  292.18248  136.64369   67.60763   67.54963",
        "29.00000000   -4096.67080385    4790.55717820   -2509.19035159 -2.520666714 -4.928041307 -5.302632581    6784.959531 0.000461   51.65431  292.18113  128.27686   79.85963   79.80764",
        "30.00000000   -4238.38253246    4484.09570490   -2821.32212219 -2.201278274 -5.283435155 -5.097787234    6784.254618 0.000406   51.65196  292.17938  114.69506   97.32641   97.28029",
        "31.00000000   -4360.62350696    4157.03460022   -3120.45581545 -1.871891120 -5.614437032 -4.869531610    6783.501952 0.000400   51.64944  292.17721   97.83276  118.07353  118.03307",
        "32.00000000   -4462.83925057    3810.88310301   -3405.21835892 -1.534026430 -5.919542609 -4.618934461    6782.715384 0.000447   51.64681  292.17460   82.91174  136.87924  136.84418",
        "33.00000000   -4544.56766709    3447.23707557   -3674.30385610 -1.189241167 -6.197369753 -4.347165305    6781.909367 0.000533   51.64412  292.17153   73.02029  150.65528  150.62533",
        "34.00000000   -4605.44096637    3067.77149771   -3926.47945540 -0.839120692 -6.446664230 -4.055488455    6781.098692 0.000639   51.64140  292.16799   67.63735  159.92273  159.89756",
        "35.00000000   -4645.18714583    2674.23263965   -4160.59084983 -0.485271357 -6.666304703 -3.745256689    6780.298218 0.000754   51.63873  292.16398   65.31425  166.13028  166.10955",
        "36.00000000   -4663.63102841    2268.42995504   -4375.56738784 -0.129313132 -6.855307059 -3.417904619    6779.522597 0.000870   51.63613  292.15951   64.93826  170.39068  170.37403",
        "37.00000000   -4660.69485950    1852.22773532   -4570.42677826  0.227127716 -7.012828043 -3.074941811    6778.786009 0.000982   51.63366  292.15461   65.80959  173.40374  173.39080",
        "38.00000000   -4636.39846734    1427.53656561   -4744.27937568  0.582425853 -7.138168238 -2.717945682    6778.101910 0.001086   51.63137  292.14929   67.50038  175.59734  175.58777",
        "39.00000000   -4590.85899332     996.30462130   -4896.33203442  0.934963982 -7.230774396 -2.348554232    6777.482783 0.001181   51.62929  292.14360   69.74316  177.23893  177.23241",
        "40.00000000   -4524.29019969     560.50884321   -5025.89152208  1.283139823 -7.290241155 -1.968458641    6776.939915 0.001263   51.62747  292.13757   72.36436  178.50213  178.49835",
        "41.00000000   -4437.00136345     122.14602810   -5132.36748533  1.625372925 -7.316312154 -1.579395753    6776.483198 0.001332   51.62594  292.13125   75.24622  179.50469  179.50337",
        "42.00000000   -4329.39576620    -316.77613056   -5215.27496242  1.960111324 -7.308880572 -1.183140489    6776.120949 0.001385   51.62473  292.12469   78.30489  180.33046  180.33138",
        "43.00000000   -4201.96878995    -754.24801754   -5274.23643830  2.285838015 -7.267989121 -0.781498194    6775.859761 0.001423   51.62385  292.11795   81.47727  181.04254  181.04551",
        "44.00000000   -4055.30562979   -1188.26705414   -5308.98343932  2.601077252 -7.193829502 -0.376296943    6775.704387 0.001444   51.62333  292.11109   84.71265  181.69166  181.69655",
        "45.00000000   -3890.07863435   -1616.84660820   -5319.35766557  2.904400655 -7.086741342  0.030620175    6775.657656 0.001448   51.62318  292.10417   87.96699  182.32185  182.32858",
        "46.00000000   -3707.04428539   -2038.02482528   -5305.31165933  3.194433128 -6.947210633  0.437402802    6775.720422 0.001435   51.62339  292.09725   91.19853  182.97486  182.98340",
        "47.00000000   -3507.03982796   -2449.87335097   -5266.90900897  3.469858588 -6.775867667  0.842201051    6775.891545 0.001405   51.62396  292.09041   94.36389  183.69409  183.70447",
        "48.00000000   -3290.97956294   -2850.50591475   -5204.32408796  3.729425486 -6.573484484  1.243173263    6776.167918 0.001359   51.62489  292.08369   97.41380  184.52879  184.54110",
        "49.00000000   -3059.85081417   -3238.08674572   -5117.84132913  3.971952134 -6.340971824  1.638493744    6776.544517 0.001297   51.62615  292.07716  100.28790  185.53935  185.55371",
        "50.00000000   -2814.70958257   -3610.83879073   -5007.85403480  4.196331804 -6.079375583  2.026360495    6777.014489 0.001221   51.62773  292.07088  102.90721  186.80471  186.82131",
        "51.00000000   -2556.67590075   -3967.05170459   -4874.86272403  4.401537612 -5.789872762  2.405002912    6777.569279 0.001132   51.62959  292.06490  105.16274  188.43392  188.45296",
        "52.00000000   -2286.92890196   -4305.08958214   -4719.47301898  4.586627152 -5.473766908  2.772689445    6778.198779 0.001032   51.63170  292.05926  106.89684  190.58458  190.60632",
        "53.00000000   -2006.70161865   -4623.39840092   -4542.39307326  4.750746874 -5.132483027  3.127735201    6778.891511 0.000924   51.63402  292.05400  107.87219  193.49406  193.51878",
        "54.00000000   -1717.27552691   -4920.51314271   -4344.43054650  4.893136170 -4.767561963  3.468509464    6779.634829 0.000811   51.63651  292.04916  107.71903  197.53209  197.56011",
        "55.00000000   -1419.97485466   -5195.06456182   -4126.48913066  5.013131161 -4.380654241  3.793443108    6780.415149 0.000697   51.63912  292.04476  105.85036  203.28572  203.31732",
        "56.00000000   -1116.16067305   -5445.78556745   -3889.56463551  5.110168134 -3.973513360  4.101035869    6781.218196 0.000590   51.64181  292.04082  101.35588  211.66525  211.70075",
        "57.00000000    -807.22479234   -5671.51718717   -3634.74064273  5.183786621 -3.547988537  4.389863446    6782.029260 0.000500   51.64452  292.03735   93.02963  223.87665  223.91636",
        "58.00000000    -494.58348534   -5871.21407901   -3363.18374039  5.233632061 -3.106016918  4.658584377    6782.833464 0.000442   51.64721  292.03435   80.14646  240.64510  240.68929",
        "59.00000000    -179.67106380   -6043.94955969   -3076.13835227  5.259458041 -2.649615242  4.905946662    6783.616036 0.000433   51.64983  292.03180   64.50249  260.17448  260.22341",
        "60.00000000     136.06666536   -6188.92011782   -2774.92117901  5.261128055 -2.180871011  5.130794067    6784.362582 0.000475   51.65232  292.02970   50.51230  278.05026  278.10413",
        "61.00000000     451.17903463   -6305.44938195   -2460.91527154  5.238616767 -1.701933156  5.332072075    6785.059348 0.000553   51.65465  292.02802   40.97363  291.47472  291.53371",
        "62.00000000     764.21721054   -6392.99151548   -2135.56375970  5.192010750 -1.215002268  5.508833420    6785.693478 0.000652   51.65677  292.02672   35.66579  300.66857  300.73278",
        "63.00000000    1073.74091558   -6451.13401256   -1800.36326257  5.121508650 -0.722320414  5.660243156    6786.253252 0.000758   51.65864  292.02577   33.38511  306.83551  306.90499",
        "64.00000000    1378.32514343   -6479.59987212   -1456.85700976  5.027420793 -0.226160597  5.785583221    6786.728302 0.000864   51.66022  292.02511   33.11755  310.98961  311.06434",
        "65.00000000    1676.56683230   -6478.24913071   -1106.62770605  4.910168182  0.271184073  5.884256425    6787.109813 0.000966   51.66149  292.02471   34.19399  313.80003  313.87991",
        "66.00000000    1967.09146046   -6447.07973818    -751.29017433  4.770280898  0.767411436  5.955789845    6787.390684 0.001061   51.66243  292.02449   36.19437  315.68685  315.77170",
        "67.00000000    2248.55952746   -6386.22776503    -392.48381431  4.608395886  1.260221501  5.999837571    6787.565668 0.001145   51.66301  292.02441   38.85299  316.91580  317.00537",
        "68.00000000    2519.67288478   -6295.96693421     -31.86491680  4.425254147  1.747327729  6.016182772    6787.631467 0.001218   51.66322  292.02440   41.99747  317.65930  317.75324",
        "69.00000000    2779.18087986   -6176.70747545     328.90112524  4.221697324  2.226468322  6.004739063    6787.586802 0.001278   51.66307  292.02439   45.51251  318.03267  318.13054",
        "70.00000000    3025.88627854   -6028.99430471     688.14766618  3.998663726  2.695417418  5.965551154    6787.432438 0.001325   51.66255  292.02433   49.31867  318.11538  318.21669",
        "71.00000000    3258.65093202   -5853.50453655    1044.21467409  3.757183795  3.151996118  5.898794762    6787.171172 0.001358   51.66168  292.02414   53.35944  317.96395  318.06811",
        "72.00000000    3476.40115654   -5651.04434213    1395.45657038  3.498375059  3.594083260  5.804775800    6786.807782 0.001378   51.66046  292.02378   57.59336  317.61989  317.72623",
        "73.00000000    3678.13279549   -5422.54517024    1740.24999894  3.223436605  4.019625858  5.683928837    6786.348942 0.001383   51.65893  292.02317   61.98883  317.11480  317.22260",
        "74.00000000    3862.91593684   -5169.05935349    2077.00148186  2.933643119  4.426649145  5.536814855    6785.803099 0.001376   51.65711  292.02228   66.52065  316.47389  316.58237",
        "75.00000000    4029.89926080   -4891.75512582    2404.15491999  2.630338533  4.813266138  5.364118318    6785.180314 0.001355   51.65503  292.02105   71.16749  315.71849  315.82682",
        "76.00000000    4178.31399613   -4591.91108160    2720.19889814  2.314929342  5.177686672  5.166643589    6784.492080 0.001322   51.65273  292.01944   75.90994  314.86804  314.97533",
        "77.00000000    4307.47746617   -4270.91010971    3023.67375676  1.988877627  5.518225852  4.945310737    6783.751101 0.001278   51.65026  292.01741   80.72870  313.94183  314.04717",
        "78.00000000    4416.79620919   -3930.23283908    3313.17839434  1.653693854  5.833311874  4.701150759    6782.971065 0.001223   51.64765  292.01494   85.60285  312.96076  313.06325",
        "79.00000000    4505.76866067   -3571.45063441    3587.37676741  1.310929485  6.121493185  4.435300283    6782.166380 0.001159   51.64497  292.01202   90.50775  311.94948  312.04817",
        "80.00000000    4573.98738835   -3196.21818264    3845.00405777  0.962169474  6.381444961  4.148995787    6781.351913 0.001086   51.64225  292.00862   95.41235  310.93900  311.03299",
        "81.00000000    4621.14087381   -2806.26571196    4084.87247962  0.609024674  6.611974871  3.843567391    6780.542710 0.001007   51.63955  292.00475  100.27535  309.97063  310.05900",
        "82.00000000    4647.01483750   -2403.39088605    4305.87670245  0.253124216  6.812028134  3.520432269    6779.753719 0.000921   51.63691  292.00042  105.03922  309.10185  309.18375",
        "83.00000000    4651.49310636   -1989.45041621    4506.99886819 -0.103892104  6.980691869  3.181087731    6778.999513 0.000831   51.63439  291.99565  109.62044  308.41615  308.49075",
        "84.00000000    4634.55802605   -1566.35143431    4687.31318444 -0.460381384  7.117198726  2.827104025    6778.294017 0.000737   51.63204  291.99045  113.89255  308.03996  308.10650",
        "85.00000000    4596.29042152   -1136.04266860    4845.99007821 -0.814705106  7.220929830  2.460116902    6777.650256 0.000642   51.62989  291.98486  117.65467  308.17412  308.23189",
        "86.00000000    4536.86911189    -700.50546380    4982.29989715 -1.165236500  7.291417036  2.081819979    6777.080111 0.000545   51.62798  291.97891  120.56966  309.15572  309.20412",
        "87.00000000    4456.56998689    -261.74468598    5095.61614774 -1.510367793  7.328344530  1.693956951    6776.594101 0.000449   51.62636  291.97266  122.03492  311.58731  311.62581",
        "88.00000000    4355.76465359     178.22044851    5185.41826194 -1.848517286  7.331549771  1.298313672    6776.201191 0.000358   51.62504  291.96616  120.90410  316.61519  316.64336",
        "89.00000000    4234.91866322     617.36558206    5251.29388577 -2.178136272  7.301023820  0.896710139    6775.908626 0.000277   51.62407  291.95945  114.95168  326.46482  326.48233",
        "90.00000000    4094.58932875    1053.67042546    5292.94068473 -2.497715766  7.236911054  0.490992404    6775.721798 0.000218   51.62344  291.95261  100.70780  344.60602  344.61265",
        "91.00000000    3935.42314465    1485.12793263    5310.16766244 -2.805793039  7.139508286  0.083024435    6775.644149 0.000203   51.62318  291.94569   78.42729   10.78389   10.77954",
        "92.00000000    3758.15282082    1909.75340500    5302.89599018 -3.100957948  7.009263313 -0.325320056    6775.677104 0.000239   51.62329  291.93876   59.12248   33.98604   33.97071",
        "93.00000000    3563.59394337    2325.59349150    5271.15934573 -3.381859047  6.846772886 -0.732165799    6775.820052 0.000309   51.62377  291.93187   49.20167   47.80410   47.77791",
        "94.00000000    3352.64127548    2730.73505014    5215.10376114 -3.647209474  6.652780130 -1.135644161    6776.070351 0.000392   51.62461  291.92511   45.95497   54.94793   54.91112"
    ];
    var outlist = [];
    var num, val;
    var posSplit, pos;

    for (num = 0; num < iss_lines.length; num++) {
        posSplit = iss_lines[num].trim().split(/ +/, 7);
        pos = {t: parseFloat(posSplit[0]),
               x  : posSplit[1] * 1000.0, // convert SGP4's Km to Cesium's meters
               y  : posSplit[2] * 1000.0,
               z  : posSplit[3] * 1000.0,
               vx : posSplit[4] * 1000.0,
               vy : posSplit[5] * 1000.0,
               vz : posSplit[6] * 1000.0};
        outlist.push(pos);
    }
    return outlist;
};