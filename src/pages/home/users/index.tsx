import React from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import { Bone } from '../../../components';

import BrowserOnly from '@docusaurus/BrowserOnly';
import './index.scss';

const data = {
  desc: (
    <span>
      <Translate id="homepage.userDesc1">请在</Translate>{' '}
      <a rel="noopener noreferrer" target="_blank" href="https://github.com/seata/seata/issues/1246">
        Wanted: who&#39;s using Seata
      </a>{' '}
      <Translate id="homepage.userDesc2">上提供信息来帮助 Seata 做的更好。</Translate>
    </span>
  ),
  list: [
    'https://img.alicdn.com/imgextra/i1/O1CN01TleQq128FAP8POtL5_!!6000000007902-2-tps-241-42.png' ,
    'https://img.alicdn.com/imgextra/i4/O1CN01IOIk0s1bWgJ05f4HF_!!6000000003473-2-tps-1200-699.png' ,
    'https://img.alicdn.com/tfs/TB1Ly5oS3HqK1RjSZFPXXcwapXa-238-54.png' ,
    'https://img.alicdn.com/imgextra/i3/O1CN01Hohqhm1JvGPE4cSD4_!!6000000001090-1-tps-436-84.gif' ,
    'https://img.alicdn.com/tfs/TB1hvabw9f2gK0jSZFPXXXsopXa-174-100.png' ,
    'https://img.alicdn.com/imgextra/i3/O1CN01qkkEMZ1Jr8qDmXdAa_!!6000000001081-2-tps-220-67.png' ,
    'https://img.alicdn.com/imgextra/i3/O1CN01RXbaWn1SDbBfpCs1B_!!6000000002213-0-tps-640-458.jpg' ,
    'https://img.alicdn.com/imgextra/i1/O1CN01Rkw4z01OPGomOisU1_!!6000000001697-2-tps-220-64.png' ,
    'https://img.alicdn.com/imgextra/i3/O1CN01y0Wwc51wxnbw9FDJi_!!6000000006375-2-tps-252-84.png' ,
    'https://img.alicdn.com/tfs/TB1GMQpZHY1gK0jSZTEXXXDQVXa-203-63.png' ,
    'https://img.alicdn.com/tfs/TB1oHThw.Y1gK0jSZFCXXcwqXXa-214-200.png' ,
    'https://img.alicdn.com/imgextra/i3/O1CN01McNkv624Z5AKVHR0h_!!6000000007404-2-tps-140-54.png' ,
    'https://img.alicdn.com/tfs/TB1x0p5jxvbeK8jSZPfXXariXXa-272-83.png' ,
    'https://img.alicdn.com/imgextra/i2/O1CN01M9aSuY1nQWGxoVQu9_!!6000000005084-2-tps-239-78.png' ,
    'https://img.alicdn.com/imgextra/i1/O1CN01PmTFnO1gZ2K7GUpgh_!!6000000004155-2-tps-2406-747.png' ,
    'https://img.alicdn.com/tfs/TB1.zqEoAL0gK0jSZFAXXcA9pXa-245-38.png' ,
    'https://img.alicdn.com/tfs/TB1cgvjwYj1gK0jSZFOXXc7GpXa-1040-282.png' ,
    'https://img.alicdn.com/imgextra/i3/O1CN01OioqXX1dfxSxg6DYn_!!6000000003764-2-tps-574-122.png' ,
    'https://img.alicdn.com/tfs/TB1DDiCorY1gK0jSZTEXXXDQVXa-440-114.jpg' ,
    'https://img.alicdn.com/tfs/TB1SXGzoxn1gK0jSZKPXXXvUXXa-426-180.jpg' ,
    'https://img.alicdn.com/imgextra/i1/O1CN01qo6gfd1l7AK1LIF8t_!!6000000004771-2-tps-132-40.png' ,
    'https://img.alicdn.com/tfs/TB1rCNSFxn1gK0jSZKPXXXvUXXa-172-31.png' ,
    'https://img.alicdn.com/tfs/TB1Xa3bZQL0gK0jSZFtXXXQCXXa-936-93.png' ,
    'https://img.alicdn.com/tfs/TB1e7Wiovb2gK0jSZK9XXaEgFXa-1028-160.jpg' ,
    'https://img.alicdn.com/tfs/TB12cmCouL2gK0jSZFmXXc7iXXa-310-110.jpg' ,
    'https://img.alicdn.com/tfs/TB1j0dEop67gK0jSZPfXXahhFXa-400-208.jpg' ,
    'https://img.alicdn.com/imgextra/i1/O1CN01edO0ox1Nu7syhwbAy_!!6000000001629-2-tps-300-112.png' ,
    'https://img.alicdn.com/imgextra/i3/O1CN01hygG6821bQLGWN8tm_!!6000000007003-2-tps-98-52.png' ,
    'https://img.alicdn.com/tfs/TB1tuSyouT2gK0jSZFvXXXnFXXa-304-94.jpg' ,
    'https://img.alicdn.com/imgextra/i4/O1CN01BWFT271rXAVLUYWWG_!!6000000005640-2-tps-185-40.png' ,
    'https://img.alicdn.com/tfs/TB1c8iCouL2gK0jSZFmXXc7iXXa-428-102.jpg' ,
    'https://img.alicdn.com/imgextra/i4/O1CN01njYJ2J1ytnNhCFWcI_!!6000000006637-2-tps-340-104.png' ,
    'https://img.alicdn.com/tfs/TB1OCGioCf2gK0jSZFPXXXsopXa-500-179.jpg' ,
    'https://img.alicdn.com/tfs/TB1Atu9ovzO3e4jSZFxXXaP_FXa-310-60.png' ,
    'https://img.alicdn.com/tfs/TB1pfYTpRBh1e4jSZFhXXcC9VXa-151-72.png' ,
    'https://img.alicdn.com/imgextra/i1/O1CN01F5wna31NJwavQ0r4w_!!6000000001550-2-tps-171-48.png' ,
    'https://img.alicdn.com/tfs/TB1UTwmZFT7gK0jSZFpXXaTkpXa-201-85.png' ,
    'https://img.alicdn.com/tfs/TB143R4op67gK0jSZPfXXahhFXa-148-42.png' ,
    'https://img.alicdn.com/tfs/TB1iMSAopP7gK0jSZFjXXc5aXXa-398-182.jpg' ,
    'https://img.alicdn.com/imgextra/i1/O1CN01b1huj51aYDwz4RqSQ_!!6000000003341-2-tps-350-51.png' ,
    'https://img.alicdn.com/imgextra/i1/O1CN01SekTsn25izLZW7IKo_!!6000000007561-2-tps-270-124.png' ,
    'https://img.alicdn.com/imgextra/i2/O1CN01cyUkSO20BUISGUjyw_!!6000000006811-2-tps-149-114.png' ,
    'https://img.alicdn.com/tfs/TB1JvOjouT2gK0jSZFvXXXnFXXa-386-146.jpg' ,
    'https://img.alicdn.com/tfs/TB1ChKFoBr0gK0jSZFnXXbRRXXa-402-166.jpg' ,
    'https://img.alicdn.com/tfs/TB1bNWFoBr0gK0jSZFnXXbRRXXa-398-336.jpg' ,
    'https://img.alicdn.com/tfs/TB1_D9Boxn1gK0jSZKPXXXvUXXa-580-218.jpg' ,
    'https://img.alicdn.com/imgextra/i2/O1CN01u3zEdz1Puhc2jO2kT_!!6000000001901-2-tps-114-43.png' ,
    'https://img.alicdn.com/tfs/TB1_miroq61gK0jSZFlXXXDKFXa-283-70.png' ,
    'https://img.alicdn.com/tfs/TB1HD.oZUY1gK0jSZFMXXaWcVXa-300-300.png' ,
    'https://img.alicdn.com/tfs/TB1CaSroAT2gK0jSZPcXXcKkpXa-492-176.jpg' ,
    'https://img.alicdn.com/imgextra/i3/O1CN01lp3KWN1uGd2y6CEAx_!!6000000006010-2-tps-1383-1023.png' ,
    'https://img.alicdn.com/tfs/TB1JNSqouH2gK0jSZFEXXcqMpXa-450-182.jpg' ,
    'https://img.alicdn.com/imgextra/i1/O1CN01MMilH71k2IUuZsp45_!!6000000004625-2-tps-128-80.png' ,
    'https://img.alicdn.com/tfs/TB1NV1uouH2gK0jSZJnXXaT1FXa-462-172.jpg' ,
    'https://img.alicdn.com/imgextra/i2/O1CN01ZTwkxR1VubDVHuxii_!!6000000002713-2-tps-72-50.png' ,
    'https://img.alicdn.com/tfs/TB1CCavoBr0gK0jSZFnXXbRRXXa-240-100.png' ,
    'https://img.alicdn.com/tfs/TB1IIivoxD1gK0jSZFyXXciOVXa-200-130.png' ,
    'https://img.alicdn.com/tfs/TB1kQThrFY7gK0jSZKzXXaikpXa-220-110.jpg' ,
    'https://img.alicdn.com/tfs/TB15r7dZHY1gK0jSZTEXXXDQVXa-234-233.png' ,
    'https://img.alicdn.com/tfs/TB1LK6jrUT1gK0jSZFrXXcNCXXa-180-54.png' ,
    'https://img.alicdn.com/tfs/TB1SEzM0eL2gK0jSZFmXXc7iXXa-154-45.png' ,
    'https://img.alicdn.com/imgextra/i3/O1CN01g9LjBW1YCa03USGaO_!!6000000003023-2-tps-158-29.png' ,
    'https://img.alicdn.com/tfs/TB1VGpTFET1gK0jSZFrXXcNCXXa-193-55.png' ,
    'https://img.alicdn.com/tfs/TB19Y8XFEY1gK0jSZFMXXaWcVXa-160-60.png' ,
    'https://img.alicdn.com/tfs/TB1V1YlrRv0gK0jSZKbXXbK2FXa-514-160.png' ,
    'https://img.alicdn.com/tfs/TB1oC2prND1gK0jSZFyXXciOVXa-246-124.jpg' ,
    'https://img.alicdn.com/tfs/TB1defkrLb2gK0jSZK9XXaEgFXa-434-146.jpg' ,
    'https://img.alicdn.com/tfs/TB1uIHmrHr1gK0jSZR0XXbP8XXa-1024-568.png' ,
    'https://img.alicdn.com/tfs/TB1ERHlrUY1gK0jSZFMXXaWcVXa-120-60.png' ,
    'https://img.alicdn.com/tfs/TB1LT2lrNn1gK0jSZKPXXXvUXXa-300-300.jpg' ,
    'https://img.alicdn.com/tfs/TB1s2LprUY1gK0jSZFCXXcwqXXa-618-148.jpg' ,
    'https://img.alicdn.com/tfs/TB1qtGew7T2gK0jSZPcXXcKkpXa-294-104.png' ,
    'https://img.alicdn.com/imgextra/i1/O1CN0191WwyY1d8WZaQZcjA_!!6000000003691-2-tps-200-200.png' ,
    'https://img.alicdn.com/tfs/TB1KVJ9wWL7gK0jSZFBXXXZZpXa-145-59.png' ,
    'https://img.alicdn.com/tfs/TB1vWafw7T2gK0jSZFkXXcIQFXa-301-100.png' ,
    'https://img.alicdn.com/imgextra/i2/O1CN01Nop2ji1glrR8j0u21_!!6000000004183-2-tps-120-50.png' ,
    'https://img.alicdn.com/tfs/TB1hC5cwVY7gK0jSZKzXXaikpXa-318-134.png' ,
    'https://img.alicdn.com/tfs/TB1VuPhw4D1gK0jSZFyXXciOVXa-294-124.png' ,
    'https://img.alicdn.com/tfs/TB1FFX6FqL7gK0jSZFBXXXZZpXa-288-101.png' ,
    'https://img.alicdn.com/tfs/TB1gkXaFrr1gK0jSZR0XXbP8XXa-187-57.png' ,
    'https://img.alicdn.com/imgextra/i3/O1CN01svojxj1LuvK3hgQ5Y_!!6000000001360-2-tps-133-48.png' ,
    'https://img.alicdn.com/tfs/TB1oJKiw4D1gK0jSZFyXXciOVXa-2053-377.png' ,
    'https://img.alicdn.com/tfs/TB1eKFXFEz1gK0jSZLeXXb9kVXa-163-54.png' ,
    'https://img.alicdn.com/tfs/TB1Qcd0p79l0K4jSZFKXXXFjpXa-372-125.png' ,
    'https://img.alicdn.com/tfs/TB1UKocmPMZ7e4jSZFOXXX7epXa-234-82.png' ,
    'https://img.alicdn.com/tfs/TB1eswAZFP7gK0jSZFjXXc5aXXa-800-800.png' ,
    'https://img.alicdn.com/tfs/TB1IXqgwYj1gK0jSZFuXXcrHpXa-197-58.png' ,
    'https://img.alicdn.com/tfs/TB1KmosZNv1gK0jSZFFXXb0sXXa-247-61.png' ,
    'https://img.alicdn.com/imgextra/i3/O1CN018aBoRi1ZOm8uiOJwA_!!6000000003185-0-tps-1659-569.jpg' ,
    'https://img.alicdn.com/tfs/TB1bH5fw7L0gK0jSZFAXXcA9pXa-442-39.png' ,
    'https://img.alicdn.com/tfs/TB1xAJUFy_1gK0jSZFqXXcpaXXa-320-80.jpg' ,
    'https://img.alicdn.com/imgextra/i1/O1CN01bQlU6F1r8R7GYzQxf_!!6000000005586-2-tps-318-60.png' ,
    'https://img.alicdn.com/tfs/TB1ICJfFuH2gK0jSZJnXXaT1FXa-654-232.png' ,
    'https://img.alicdn.com/tfs/TB1rxndw4n1gK0jSZKPXXXvUXXa-150-68.png' ,
    'https://img.alicdn.com/imgextra/i4/O1CN01jEUKEJ1WS28EnlGRb_!!6000000002786-2-tps-240-60.png' ,
    'https://img.alicdn.com/tfs/TB1m0FcFuH2gK0jSZFEXXcqMpXa-139-48.png' ,
    'https://img.alicdn.com/imgextra/i1/O1CN01XJFoMP1qIDxrcCFC8_!!6000000005472-2-tps-120-46.png' ,
    'https://img.alicdn.com/tfs/TB14LhHmMgP7K4jSZFqXXamhVXa-300-135.png' ,
    'https://img.alicdn.com/tfs/TB1uUtaFuT2gK0jSZFvXXXnFXXa-370-45.jpg' ,
    'https://img.alicdn.com/imgextra/i3/O1CN018AiGbE1PZdN8Vu4Fd_!!6000000001855-2-tps-630-220.png' ,
    'https://img.alicdn.com/tfs/TB1iqo_FaL7gK0jSZFBXXXZZpXa-361-54.jpg' ,
    'https://img.alicdn.com/imgextra/i1/O1CN01fkwike1yZdx8ZBeP6_!!6000000006593-2-tps-460-136.png' ,
    'https://img.alicdn.com/imgextra/i4/O1CN01onGhwm1j2vQTRjmx8_!!6000000004491-2-tps-100-48.png' ,
    'https://img.alicdn.com/imgextra/i3/O1CN014QzjZ31l7AK1LINSu_!!6000000004771-2-tps-1073-175.png' ,
    'https://img.alicdn.com/imgextra/i3/O1CN01TKiMMC1VQpSIe3n7i_!!6000000002648-2-tps-931-865.png' ,
    'https://img.alicdn.com/tfs/TB1SxJWFEY1gK0jSZFCXXcwqXXa-185-65.png' ,
    'https://img.alicdn.com/imgextra/i1/O1CN01tiLZ0d1dvWx2Dwl4N_!!6000000003798-2-tps-189-45.png' ,
    'https://img.alicdn.com/imgextra/i3/O1CN012jqfoI22wmQR2jiiY_!!6000000007185-0-tps-200-93.jpg' ,
    'https://img.alicdn.com/tfs/TB1rhNRFAL0gK0jSZFtXXXQCXXa-321-96.png' ,
    'https://img.alicdn.com/imgextra/i4/O1CN012swbCB1HU7hgxsF8r_!!6000000000760-0-tps-121-121.jpg' ,
    'https://img.alicdn.com/tfs/TB1zuAzZKL2gK0jSZFmXXc7iXXa-691-263.png' ,
    'https://img.alicdn.com/tfs/TB18TNRFEz1gK0jSZLeXXb9kVXa-244-60.jpg' ,
    'https://img.alicdn.com/tfs/TB1i1JTFCf2gK0jSZFPXXXsopXa-151-60.png' ,
    'https://img.alicdn.com/tfs/TB1ztXXFpY7gK0jSZKzXXaikpXa-179-60.png' ,
    'https://img.alicdn.com/tfs/TB1SkJ9FuT2gK0jSZFvXXXnFXXa-266-56.png' ,
    'https://img.alicdn.com/tfs/TB1AzbWgZKfxu4jSZPfXXb3dXXa-1117-382.png' ,
    'https://img.alicdn.com/tfs/TB1HtFZFq61gK0jSZFlXXXDKFXa-1375-214.png' ,
    'https://img.alicdn.com/tfs/TB1nax.FuH2gK0jSZFEXXcqMpXa-336-154.png' ,
    'https://img.alicdn.com/tfs/TB1nS7IZNv1gK0jSZFFXXb0sXXa-716-193.png' ,
    'https://img.alicdn.com/tfs/TB13aaKpA9l0K4jSZFKXXXFjpXa-300-300.png' ,
    'https://img.alicdn.com/tfs/TB1To3amPMZ7e4jSZFOXXX7epXa-1228-500.png' ,
    'https://img.alicdn.com/tfs/TB1CZuKpA9l0K4jSZFKXXXFjpXa-283-92.png' ,
    'https://img.alicdn.com/tfs/TB1E4slZFT7gK0jSZFpXXaTkpXa-268-268.png' ,
    'https://img.alicdn.com/tfs/TB1.sIyZKL2gK0jSZFmXXc7iXXa-121-121.png' ,
    'https://img.alicdn.com/tfs/TB1aUUcZHY1gK0jSZTEXXXDQVXa-246-72.png' ,
    'https://img.alicdn.com/tfs/TB1v3.gZLb2gK0jSZK9XXaEgFXa-240-240.png' ,
    'https://img.alicdn.com/tfs/TB1VHkrZHr1gK0jSZFDXXb9yVXa-248-80.png' ,
    'https://img.alicdn.com/tfs/TB1kGElZUH1gK0jSZSyXXXtlpXa-126-48.png' ,
    'https://img.alicdn.com/tfs/TB1kIIqZUY1gK0jSZFMXXaWcVXa-90-80.png' ,
    'https://img.alicdn.com/tfs/TB1CawkZND1gK0jSZFsXXbldVXa-112-112.png' ,
    'https://img.alicdn.com/tfs/TB1fxZqZQL0gK0jSZFAXXcA9pXa-300-300.png' ,
    'https://img.alicdn.com/tfs/TB1q3UiZKL2gK0jSZPhXXahvXXa-802-271.png' ,
    'https://img.alicdn.com/tfs/TB1uf7bZQL0gK0jSZFtXXXQCXXa-303-65.png' ,
    'https://img.alicdn.com/tfs/TB1WMgmZUY1gK0jSZFCXXcwqXXa-189-57.png' ,
    'https://img.alicdn.com/tfs/TB1gnllpnM11u4jSZPxXXahcXXa-150-60.png' ,
    'https://img.alicdn.com/tfs/TB1NJmLpA9l0K4jSZFKXXXFjpXa-195-60.png' ,
    'https://img.alicdn.com/tfs/TB1jfCLpA9l0K4jSZFKXXXFjpXa-514-220.png' ,
    'https://img.alicdn.com/tfs/TB1vxJ.ZVT7gK0jSZFpXXaTkpXa-309-51.png' ,
    'https://img.alicdn.com/tfs/TB1v5eiZ.T1gK0jSZFrXXcNCXXa-500-41.png' ,
    'https://img.alicdn.com/imgextra/i2/O1CN01QPEPnx1zaOC9n4QXE_!!6000000006730-0-tps-781-100.jpg' ,
    'https://img.alicdn.com/imgextra/i3/O1CN018XKqWK1VPSHxBxLHR_!!6000000002645-2-tps-295-79.png' ,
    'https://img.alicdn.com/imgextra/i1/O1CN01UkbkeF1PCjajbslRf_!!6000000001805-0-tps-200-200.jpg' ,
    'https://img.alicdn.com/imgextra/i2/O1CN01TuPFhT288krOXRXQC_!!6000000007888-0-tps-200-200.jpg' ,
    'https://img.alicdn.com/imgextra/i2/O1CN01tUg4Nw1mULzRSQr4B_!!6000000004957-2-tps-447-346.png' ,
    'https://img.alicdn.com/imgextra/i2/O1CN01sWwoq21VPSHmzCqh7_!!6000000002645-2-tps-200-100.png' ,
    'https://img.alicdn.com/imgextra/i1/O1CN01obgBun1PjFiKUoWGr_!!6000000001876-2-tps-192-192.png' ,
    'https://img.alicdn.com/imgextra/i2/O1CN01i8iiCk29QuAitxiJq_!!6000000008063-0-tps-378-123.jpg' ,
    'https://img.alicdn.com/imgextra/i2/O1CN01LBYXi6288krJ6Axq8_!!6000000007888-2-tps-1206-158.png' ,
    'https://img.alicdn.com/imgextra/i2/O1CN01FN4K3I1Sq4SQVsDxo_!!6000000002297-2-tps-414-95.png' ,
    'https://img.alicdn.com/imgextra/i2/O1CN0130Bp8H1STd65Fnxn0_!!6000000002248-2-tps-677-172.png',
    'https://img.alicdn.com/imgextra/i1/O1CN0186ESVW1hhZO7Otx4X_!!6000000004309-2-tps-376-108.png',
    'https://img.alicdn.com/imgextra/i2/O1CN011hLbRH1fTiAi6Lq5Z_!!6000000004008-0-tps-283-283.jpg',
    'https://img.alicdn.com/imgextra/i3/O1CN01cJQsV91Fz9LeJEaL1_!!6000000000557-0-tps-339-189.jpg',
    'https://img.alicdn.com/imgextra/i4/O1CN01KvsEOP21a3CUzDllu_!!6000000007000-2-tps-1920-750.png',
    'https://img.alicdn.com/imgextra/i1/O1CN01Erdiwd1RrcDt2bqKl_!!6000000002165-0-tps-1080-1080.jpg',
    'https://img.alicdn.com/imgextra/i4/O1CN01Rc0vU61sSQ3jvR0rw_!!6000000005765-2-tps-1076-228.png',
    ],
  title: translate({ id: 'homepage.userTitle', message: '谁在使用 Seata' }),
};

const User = () => {
  return (
    <BrowserOnly>
      {() => (
        <section className="users-section">
          <h3>{data.title}</h3>
          <Bone type="dark" />
          <p>{data.desc}</p>
          <div className="users">
            {data.list.map((user, i) => (
              <div className="user-item" key={i}>
                <img src={user} />
              </div>
            ))}
          </div>
        </section>
      )}
    </BrowserOnly>
  );
};

export default User;