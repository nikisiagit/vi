/**
 * Executions Repository.
 *
 * Api interfaces used to interact with Region Executions.
 */
/**
 * @type {string}
 */
const baseUrl = '/executions';

export const executionsRepository = (client) => ({

  /**
   * Retrieve the Execution identified by the specified ExecutionArn.
   *
   * OperationId: GetExecutionWithExecutionArn
   *
   * @param executionArn {string}
   * @return {Promise<any>}
   */
  async getExecutionWithExecutionArn(executionArn) {
    return await client.$get(`${baseUrl}/${encodeURIComponent(executionArn)}`);
  },
});
