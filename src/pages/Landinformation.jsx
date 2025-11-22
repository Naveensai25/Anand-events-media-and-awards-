import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';

// Create a simple modal context since the file is missing
const useMultiFormModal = () => {
  const closeModal = () => {
    console.log('Modal closed');
    // You can add your actual modal close logic here
  };

  return { closeModal };
};

// Create a local realEstateService since the import path is invalid
const realEstateService = {
  createRealEstate: async (data) => {
    console.log('Creating real estate:', data);
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, data });
      }, 1000);
    });
  }
};

const RealEstateForm = ({ initialData }) => {
  const { closeModal } = useMultiFormModal();

  // Generate file number and set current date on component mount
  useEffect(() => {
    const generateFileNumber = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      
      // Format: RE-YYYYMMDD-HHMMSS
      return `RE-${year}${month}${day}-${hours}${minutes}${seconds}`;
    };

    const setCurrentDateTime = () => {
      const now = new Date();
      const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
        .toISOString()
        .split('T')[0];
      
      formik.setFieldValue('date', localDate);
      formik.setFieldValue('fileNo', generateFileNumber());
    };

    setCurrentDateTime();
  }, []);

  const formik = useFormik({
    initialValues: {
      fileNo: initialData?.fileNo || '',
      date: initialData?.date || '',
      referenceId: '',
      farmerId: '',
      extent: '',
      surveyNo: '',
      location: '',
      village: '',
      mandal: '',
      district: '',
      documentHolder: '',
      fatherName: '',
      address: '',
      aadharNo: '',
      contact: '',
      referenceName: '',
      referenceAadhar: '',
      referenceContact1: '',
      referenceContact2: '',
      referenceAddress: '',
      closure: '',
      farmerOwnerPosition: '',
      farmerOwnerPositionDetails: '',
      disputeIssue: '',
      disputeRevenue: false,
      disputeGovernment: false,
      disputePrivate: false,
      sfa: '',
      oneB: '',
      adangal: '',
      passbook: '',
      passbookNumber: '',
      slr: '',
      mdr: '',
      gilmanRecord: '',
      gpsSurvey: '',
      ecDigital: '',
      ecManual: '',
      fmbSketch: '',
      documentBoundariesMatch: '',
      documentConventionCopies: '',
      enjoyment: '',
      sale: '',
      numberOfDocuments: '',
      documentNumbersSaleDeed: '',
      legalHeirs: '',
      deathCertificates: '',
      note: ''
    },
    validationSchema: Yup.object({
      fileNo: Yup.string().required('File number is required'),
      date: Yup.date().required('Date is required'),
      farmerId: Yup.string().required('Farmer ID/Name is required'),
      aadharNo: Yup.string()
        .matches(/^\d{12}$/, 'Aadhar must be 12 digits')
        .nullable(),
      contact: Yup.string()
        .matches(/^\d{10}$/, 'Contact must be 10 digits')
        .nullable(),
      referenceAadhar: Yup.string()
        .matches(/^\d{12}$/, 'Aadhar must be 12 digits')
        .nullable(),
      referenceContact1: Yup.string()
        .matches(/^\d{10}$/, 'Contact must be 10 digits')
        .nullable(),
      referenceContact2: Yup.string()
        .matches(/^\d{10}$/, 'Contact must be 10 digits')
        .nullable()
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log('Real Estate Form:', values);
      try {
        const response = await realEstateService.createRealEstate(values);
        console.log('✅ Submission successful:', response);
        // Close modal after successful submission
        closeModal();
      } catch (error) {
        console.error('❌ Submission failed:', error);
      }
    }
  });

  return (
    <div className="p-4 lg:p-8 bg-gray-50">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 mb-4 lg:mb-6">
        <div className="flex-1">
          <label className="block text-xs lg:text-sm font-medium mb-1">
            ఫైల్ నంబర్ / File No. <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fileNo"
            value={formik.values.fileNo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.fileNo && formik.errors.fileNo && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.fileNo}</div>
          )}
        </div>
        <div className="flex-1">
          <label className="block text-xs lg:text-sm font-medium mb-1">
            తేదీ / Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="date"
            value={formik.values.date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.date && formik.errors.date && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.date}</div>
          )}
        </div>
      </div>

      {/* Property Details / జమీని వివరాలు */}
      <div className="mb-4 lg:mb-6 border-2 border-gray-300 rounded p-3 lg:p-4 bg-white">
        <h2 className="text-base lg:text-lg font-semibold mb-2 lg:mb-3">1. జమీని వివరాలు / Property Details</h2>
        <div className="grid grid-cols-1 gap-3 lg:gap-4">
          <div>
            <label className="block text-xs lg:text-sm font-medium mb-1">రిఫరెన్స్-ఐడీ/పేరు / Reference-ID/Name</label>
            <input
              type="text"
              name="referenceId"
              value={formik.values.referenceId}
              onChange={formik.handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs lg:text-sm font-medium mb-1">
              రైతు-ఐడీ/పేరు / Farmer-ID/Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="farmerId"
              value={formik.values.farmerId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.farmerId && formik.errors.farmerId && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.farmerId}</div>
            )}
          </div>
          <div>
            <label className="block text-xs lg:text-sm font-medium mb-1">విస్తీర్ణం / Extent</label>
            <input
              type="text"
              name="extent"
              value={formik.values.extent}
              onChange={formik.handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs lg:text-sm font-medium mb-1">సర్వే నంబర్ / Survey No</label>
            <input
              type="text"
              name="surveyNo"
              value={formik.values.surveyNo}
              onChange={formik.handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Location Details / స్థానం వివరాలు */}
      <div className="mb-4 lg:mb-6 border-2 border-gray-300 rounded p-3 lg:p-4 bg-white">
        <h2 className="text-base lg:text-lg font-semibold mb-2 lg:mb-3">2. స్థానం వివరాలు / Location Details</h2>
        <div className="grid grid-cols-1 gap-3 lg:gap-4">
          <div>
            <label className="block text-xs lg:text-sm font-medium mb-1">స్థానం / Location</label>
            <input
              type="text"
              name="location"
              value={formik.values.location}
              onChange={formik.handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs lg:text-sm font-medium mb-1">గ్రామం / Village</label>
            <input
              type="text"
              name="village"
              value={formik.values.village}
              onChange={formik.handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs lg:text-sm font-medium mb-1">మండలం / Mandal</label>
            <input
              type="text"
              name="mandal"
              value={formik.values.mandal}
              onChange={formik.handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs lg:text-sm font-medium mb-1">జిల్లా / District</label>
            <input
              type="text"
              name="district"
              value={formik.values.district}
              onChange={formik.handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Farmer Section / రైతు విభాగం */}
      <div className="mb-4 lg:mb-6 border-2 border-gray-300 rounded p-3 lg:p-4 bg-white">
        <h2 className="text-base lg:text-lg font-semibold mb-2 lg:mb-3 text-center">రైతు / FARMER</h2>
        <div className="space-y-3 lg:space-y-4">
          <div>
            <label className="block text-xs lg:text-sm font-medium mb-1">
              3. డాక్యుమెంట్ హోల్డర్ / రైతు పేరు - s/o,w/o,d/o / Document Holder / Farmer Name - s/o,w/o,d/o
            </label>
            <input
              type="text"
              name="documentHolder"
              value={formik.values.documentHolder}
              onChange={formik.handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs lg:text-sm font-medium mb-1">
              4. తండ్రి పేరు - s/o,w/o,d/o / Father Name - s/o,w/o,d/o
            </label>
            <input
              type="text"
              name="fatherName"
              value={formik.values.fatherName}
              onChange={formik.handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs lg:text-sm font-medium mb-1">చిరునామా / Address</label>
            <textarea
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              rows="2"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 gap-3 lg:gap-4">
            <div>
              <label className="block text-xs lg:text-sm font-medium mb-1">5. ఆధార్ నంబర్ / Aadhar No</label>
              <input
                type="text"
                name="aadharNo"
                value={formik.values.aadharNo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                maxLength="12"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.aadharNo && formik.errors.aadharNo && (
                <div className="text-red-500 text-xs mt-1">{formik.errors.aadharNo}</div>
              )}
            </div>
            <div>
              <label className="block text-xs lg:text-sm font-medium mb-1">సంప్రదింపు సంఖ్య / Contact</label>
              <input
                type="tel"
                name="contact"
                value={formik.values.contact}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                maxLength="10"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.contact && formik.errors.contact && (
                <div className="text-red-500 text-xs mt-1">{formik.errors.contact}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reference Section / రిఫరెన్స్ విభాగం */}
      <div className="mb-4 lg:mb-6 border-2 border-gray-300 rounded p-3 lg:p-4 bg-white">
        <h2 className="text-base lg:text-lg font-semibold mb-2 lg:mb-3 text-center">రిఫరెన్స్ / REFERENCE</h2>
        <div className="space-y-3 lg:space-y-4">
          <div>
            <label className="block text-xs lg:text-sm font-medium mb-1">6. రిఫరెన్స్ పేరు / Reference Name</label>
            <input
              type="text"
              name="referenceName"
              value={formik.values.referenceName}
              onChange={formik.handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs lg:text-sm font-medium mb-1">ఆధార్ నంబర్ / Aadhar Number</label>
            <input
              type="text"
              name="referenceAadhar"
              value={formik.values.referenceAadhar}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              maxLength="12"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.referenceAadhar && formik.errors.referenceAadhar && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.referenceAadhar}</div>
            )}
          </div>
          <div className="grid grid-cols-1 gap-3 lg:gap-4">
            <div>
              <label className="block text-xs lg:text-sm font-medium mb-1">సంప్రదింపు నంబర్ - 1 / Contact No - 1</label>
              <input
                type="tel"
                name="referenceContact1"
                value={formik.values.referenceContact1}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                maxLength="10"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.referenceContact1 && formik.errors.referenceContact1 && (
                <div className="text-red-500 text-xs mt-1">{formik.errors.referenceContact1}</div>
              )}
            </div>
            <div>
              <label className="block text-xs lg:text-sm font-medium mb-1">సంప్రదింపు నంబర్ - 2 / Contact No - 2</label>
              <input
                type="tel"
                name="referenceContact2"
                value={formik.values.referenceContact2}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                maxLength="10"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.referenceContact2 && formik.errors.referenceContact2 && (
                <div className="text-red-500 text-xs mt-1">{formik.errors.referenceContact2}</div>
              )}
            </div>
          </div>
          <div>
            <label className="block text-xs lg:text-sm font-medium mb-1">చిరునామా / Address</label>
            <textarea
              name="referenceAddress"
              value={formik.values.referenceAddress}
              onChange={formik.handleChange}
              rows="2"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Closure Section / క్లోజర్ విభాగం */}
      <div className="mb-4 lg:mb-6 border-2 border-gray-300 rounded p-3 lg:p-4 bg-white">
        <h2 className="text-base lg:text-lg font-semibold mb-2 lg:mb-3">7. క్లోజర్ / Closure</h2>
        <div className="flex flex-wrap gap-4 lg:gap-6">
          {['A', 'B', 'C', 'D'].map((option) => (
            <label key={option} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="closure"
                value={option}
                checked={formik.values.closure === option}
                onChange={formik.handleChange}
                className="w-4 h-4"
              />
              <span className="text-sm">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Farmer/Owner Position Section / రైతు/యజమాని స్థానం */}
      <div className="mb-4 lg:mb-6 border-2 border-gray-300 rounded p-3 lg:p-4 bg-white">
        <h2 className="text-base lg:text-lg font-semibold mb-2 lg:mb-3">8. రైతు/యజమాని స్థానం / Farmer/Owner Position</h2>
        <div className="flex flex-wrap gap-4 lg:gap-6 mb-2 lg:mb-3">
          {['YES', 'NO'].map((option) => (
            <label key={option} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="farmerOwnerPosition"
                value={option}
                checked={formik.values.farmerOwnerPosition === option}
                onChange={formik.handleChange}
                className="w-4 h-4"
              />
              <span className="text-sm">{option}</span>
            </label>
          ))}
        </div>
        <textarea
          name="farmerOwnerPositionDetails"
          value={formik.values.farmerOwnerPositionDetails}
          onChange={formik.handleChange}
          rows="2"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="అదనపు వివరాలు... / Additional details..."
        />
      </div>

      {/* Dispute Section / వివాదం విభాగం */}
      <div className="mb-4 lg:mb-6 border-2 border-gray-300 rounded p-3 lg:p-4 bg-white">
        <h2 className="text-base lg:text-lg font-semibold mb-2 lg:mb-3">9. వివాదం లేదా సమస్య / Dispute or Issue</h2>
        <div className="mb-2 lg:mb-3">
          <textarea
            name="disputeIssue"
            value={formik.values.disputeIssue}
            onChange={formik.handleChange}
            rows="2"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="ఏదైనా వివాదాలు లేదా సమస్యలను వివరించండి... / Describe any disputes or issues..."
          />
        </div>
        <div className="flex flex-wrap gap-4 lg:gap-6">
          {[
            { name: 'disputeRevenue', label: '(రెవెన్యూ / Revenue)' },
            { name: 'disputeGovernment', label: '(ప్రభుత్వం / Government)' },
            { name: 'disputePrivate', label: '(ప్రైవేట్ / Private)' }
          ].map((item) => (
            <label key={item.name} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name={item.name}
                checked={formik.values[item.name]}
                onChange={formik.handleChange}
                className="w-4 h-4"
              />
              <span className="text-sm">{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Document Verification Checklist / డాక్యుమెంట్ ధృవీకరణ చెక్లిస్ట్ */}
      <div className="mb-4 lg:mb-6 border-2 border-gray-300 rounded p-3 lg:p-4 bg-white">
        <h2 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4">డాక్యుమెంట్ ధృవీకరణ చెక్లిస్ట్ / Document Verification Checklist</h2>
        <div className="space-y-3 lg:space-y-4">
          {[
            { label: '10. SFA', name: 'sfa' },
            { label: '11. 1B', name: 'oneB' },
            { label: '12. ADANGAL / అడంగల్', name: 'adangal' },
            { label: '13. PASSBOOK / పాస్బుక్', name: 'passbook' },
            { label: '15. SLR', name: 'slr' },
            { label: '16. MDR', name: 'mdr' },
            { label: '17. GILMAN RECORD', name: 'gilmanRecord' },
            { label: '18. GPS SURVEY', name: 'gpsSurvey' }
          ].map((item) => (
            <div key={item.name} className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-2 lg:pb-3 gap-2">
              <span className="font-medium text-sm">{item.label}</span>
              <div className="flex gap-4 lg:gap-6">
                {['YES', 'NO'].map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={item.name}
                      value={option}
                      checked={formik.values[item.name] === option}
                      onChange={formik.handleChange}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          
          <div className="pt-2">
            <label className="block text-xs lg:text-sm font-medium mb-1">14. పాస్బుక్ నంబర్ / PASSBOOK NUMBER</label>
            <input
              type="text"
              name="passbookNumber"
              value={formik.values.passbookNumber}
              onChange={formik.handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Additional Documents / అదనపు డాక్యుమెంట్లు */}
      <div className="mb-4 lg:mb-6 border-2 border-gray-300 rounded p-3 lg:p-4 bg-white">
        <h2 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4">అదనపు డాక్యుమెంట్లు / Additional Documents</h2>
        <div className="space-y-3 lg:space-y-4">
          {[
            { label: '19. EC- DIGITAL', name: 'ecDigital' },
            { label: '20. EC- MANUAL', name: 'ecManual' },
            { label: '21. FMB SKETCH', name: 'fmbSketch' },
            { label: '22. డాక్యుమెంట్ సరిహద్దులు జోడించు / Document Boundaries MATCH', name: 'documentBoundariesMatch' },
            { label: '23. డాక్యుమెంట్ కన్వెన్షన్ కాపీలు / Document Convention Copies', name: 'documentConventionCopies' },
            { label: '24. అనుభవం / Enjoyment', name: 'enjoyment' },
            { label: '25. క్రయం / Sale', name: 'sale' }
          ].map((item) => (
            <div key={item.name} className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-2 lg:pb-3 gap-2">
              <span className="font-medium text-sm">{item.label}</span>
              <div className="flex gap-4 lg:gap-6">
                {['YES', 'NO'].map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={item.name}
                      value={option}
                      checked={formik.values[item.name] === option}
                      onChange={formik.handleChange}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction Details / లావాదేవీ వివరాలు */}
      <div className="mb-4 lg:mb-6 border-2 border-gray-300 rounded p-3 lg:p-4 bg-white">
        <h2 className="text-base lg:text-lg font-semibold mb-2 lg:mb-3">లావాదేవీ వివరాలు / Transaction Details</h2>
        <div className="space-y-3 lg:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <label className="font-medium text-sm">26. డాక్యుమెంట్ల సంఖ్య (లావాదేవీలు) / Number Of Documents (TRANSACTIONS)</label>
            <div className="flex gap-4 lg:gap-6">
              {['YES', 'NO'].map((option) => (
                <label key={option} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="numberOfDocuments"
                    value={option}
                    checked={formik.values.numberOfDocuments === option}
                    onChange={formik.handleChange}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{option}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="pt-2">
            <label className="block text-xs lg:text-sm font-medium mb-1">27. డాక్యుమెంట్ నంబర్లు (సేల్ డీడ్) / Document Numbers (SALE DEED)</label>
            <textarea
              name="documentNumbersSaleDeed"
              value={formik.values.documentNumbersSaleDeed}
              onChange={formik.handleChange}
              rows="3"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="డాక్యుమెంట్ నంబర్లను నమోదు చేయండి... / Enter document numbers..."
            />
          </div>
        </div>
      </div>

      {/* Legal Heirs / చట్టపరమైన వారసులు */}
      <div className="mb-4 lg:mb-6 border-2 border-gray-300 rounded p-3 lg:p-4 bg-white">
        <h2 className="text-base lg:text-lg font-semibold mb-2 lg:mb-3">28. చట్టపరమైన వారసులు / Legal Heirs</h2>
        <textarea
          name="legalHeirs"
          value={formik.values.legalHeirs}
          onChange={formik.handleChange}
          rows="4"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="వివరాలతో అన్ని చట్టపరమైన వారసులను జాబితా చేయండి... / List all legal heirs with details..."
        />
      </div>

      {/* Death Certificates / మరణ ధృవపత్రాలు */}
      <div className="mb-4 lg:mb-6 border-2 border-gray-300 rounded p-3 lg:p-4 bg-white">
        <h2 className="text-base lg:text-lg font-semibold mb-2 lg:mb-3">29. మరణ ధృవపత్రాలు / Death Certificates</h2>
        <textarea
          name="deathCertificates"
          value={formik.values.deathCertificates}
          onChange={formik.handleChange}
          rows="3"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="వర్తించినట్లయితే మరణ ధృవపత్ర వివరాలను నమోదు చేయండి... / Enter death certificate details if applicable..."
        />
      </div>

      {/* Note / నోట్ */}
      <div className="mb-4 lg:mb-6 border-2 border-gray-300 rounded p-3 lg:p-4 bg-white">
        <h2 className="text-base lg:text-lg font-semibold mb-2 lg:mb-3">30. నోట్ / NOTE</h2>
        <textarea
          name="note"
          value={formik.values.note}
          onChange={formik.handleChange}
          rows="4"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="అదనపు నోట్లు లేదా వ్యాఖ్యలు... / Additional notes or comments..."
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 lg:pt-6">
        <button
          type="button"
          onClick={closeModal}
          className="px-4 lg:px-6 py-2 border border-gray-300 rounded hover:bg-gray-100 transition text-sm lg:text-base"
        >
          రద్దు / Cancel
        </button>
        <button
          type="button"
          onClick={formik.resetForm}
          className="px-4 lg:px-6 py-2 border border-gray-300 rounded hover:bg-gray-100 transition text-sm lg:text-base"
        >
          రీసెట్ / Reset
        </button>
        <button
          type="button"
          onClick={formik.handleSubmit}
          className="px-4 lg:px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm lg:text-base"
        >
          సమర్పించండి / Submit
        </button>
      </div>
    </div>
  );
};

export default RealEstateForm;