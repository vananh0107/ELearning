import React from 'react';
import { FaLock } from 'react-icons/fa';

type Props = {
  loadingTestcase: any;
  data: any;
  activeVideo: any;
  responseTestcase: any;
};

const CourseCompiler = ({
  data,
  activeVideo,
  loadingTestcase,
  responseTestcase,
}: Props) => {
  console.log(loadingTestcase)
  return (
    <>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
        Testcase
      </h2>
      {data[activeVideo]?.questionCode?.testCases.length > 0 && (
        <div className="mt-4">
          {data[activeVideo]?.questionCode?.testCases?.map(
            (testCase, testCaseIndex) => {
              const result = responseTestcase?.results.find(
                (res) => res.testCase === testCase.testCase
              );
              const bgColor =
                result?.passed === true
                  ? 'bg-green-400 dark:bg-green-600'
                  : result?.passed === false
                  ? 'bg-red-100 dark:bg-red-800'
                  : testCase.isHide
                  ? 'bg-gray-300 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-300';

              return (
                <div
                  key={testCaseIndex}
                  className={`p-3 rounded mb-2 shadow-sm ${bgColor}`}
                >
                  {loadingTestcase ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-500"></div>
                      <span className="ml-2 text-black dark:text-white">
                        Running...
                      </span>
                    </div>
                  ) : (
                    <>
                      <p className="font-semibold flex items-center text-black dark:text-white">
                        <span>Test Case {testCaseIndex + 1}</span>
                        {testCase.isHide && (
                          <span className="ml-2">
                            <FaLock />
                          </span>
                        )}
                      </p>
                      <p className="text-black dark:text-white">
                        <strong>Đầu vào:</strong>{' '}
                        {testCase.isHide ? '' : testCase.testCase}
                      </p>
                      <p className="text-black dark:text-white">
                        <strong>Kết quả mong đợi:</strong>{' '}
                        {testCase.isHide ? '' : testCase.expectedResult}
                      </p>
                      {result && !testCase.isHide && (
                        <p className="text-black dark:text-white">
                          <strong>Kết quả thực tế:</strong>{' '}
                          {result.actualResult}
                        </p>
                      )}
                    </>
                  )}
                </div>
              );
            }
          )}
        </div>
      )}
    </>
  );
};

export default CourseCompiler;
